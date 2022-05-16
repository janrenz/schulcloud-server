import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotAcceptableException,
	NotFoundException,
} from '@nestjs/common';
import { Counted, EntityId, FileRecord, FileRecordParentType, IPermissionContext, ScanStatus } from '@shared/domain';
import { AntivirusService } from '@shared/infra/antivirus/antivirus.service';
import { FileRecordRepo } from '@shared/repo';
import { Logger } from '@src/core/logger';
import { AuthorizationService } from '@src/modules/authorization';
import busboy from 'busboy';
import { Request } from 'express';
import path from 'path';
import internal from 'stream';
import { S3ClientAdapter } from '../client/s3-client.adapter';
import {
	CopyFileParams,
	CopyFilesOfParentParams,
	DownloadFileParams,
	FileRecordParams,
	SingleFileParams,
} from '../controller/dto/file-storage.params';
import { PermissionContexts } from '../files-storage.const';
import { ICopyFiles } from '../interface';
import { IFile } from '../interface/file';
import { FileStorageMapper } from '../mapper/parent-type.mapper';

@Injectable()
export class FilesStorageUC {
	constructor(
		private readonly storageClient: S3ClientAdapter,
		private readonly fileRecordRepo: FileRecordRepo,
		private readonly antivirusService: AntivirusService,
		private logger: Logger,
		private readonly authorizationService: AuthorizationService
	) {
		this.logger.setContext(FilesStorageUC.name);
	}

	async upload(userId: EntityId, params: FileRecordParams, req: Request) {
		await this.checkPermission(userId, params.parentType, params.parentId, PermissionContexts.create);

		const result = await new Promise((resolve, reject) => {
			const requestStream = busboy({ headers: req.headers });

			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			requestStream.on('file', async (_name, file, info): Promise<void> => {
				const fileDescription = this.createFileDescription(file, info, req);
				try {
					const record = await this.uploadFile(userId, params, fileDescription);
					resolve(record);
				} catch (error) {
					requestStream.emit('error', error);
				}
			});

			requestStream.on('error', (e) => {
				reject(e);
			});
			req.pipe(requestStream);
		});

		return result as FileRecord;
	}

	private createFileDescription(file: internal.Readable, info: busboy.FileInfo, req: Request): IFile {
		const size = Number(req.get('content-length'));
		const fileDescription: IFile = {
			name: info.filename,
			buffer: file,
			size,
			mimeType: info.mimeType,
		};

		return fileDescription;
	}

	private async uploadFile(userId: EntityId, params: FileRecordParams, fileDescription: IFile) {
		const [fileRecords] = await this.fileRecordRepo.findBySchoolIdAndParentId(params.schoolId, params.parentId);
		const fileName = this.checkFilenameExists(fileDescription.name, fileRecords);
		const entity = this.getNewFileRecord(fileName, fileDescription.size, fileDescription.mimeType, params, userId);
		try {
			await this.fileRecordRepo.save(entity);
			const folder = [params.schoolId, entity.id].join('/');
			await this.storageClient.create(folder, fileDescription);
			await this.antivirusService.send(entity);

			return entity;
		} catch (error) {
			await this.fileRecordRepo.delete(entity);
			throw error;
		}
	}

	private getNewFileRecord(name: string, size: number, mimeType: string, params: FileRecordParams, userId: string) {
		const entity = new FileRecord({
			size,
			name,
			mimeType,
			parentType: params.parentType,
			parentId: params.parentId,
			creatorId: userId,
			schoolId: params.schoolId,
		});
		return entity;
	}

	private createPath(schoolId: EntityId, fileRecordId: EntityId): string {
		const pathToFile = [schoolId, fileRecordId].join('/');

		return pathToFile;
	}

	private async downloadFile(schoolId: EntityId, fileRecordId: EntityId) {
		const pathToFile = this.createPath(schoolId, fileRecordId);
		const res = await this.storageClient.get(pathToFile);

		return res;
	}

	private async checkPermission(
		userId: EntityId,
		parentType: FileRecordParentType,
		parentId: EntityId,
		context: IPermissionContext
	) {
		const allowedType = FileStorageMapper.mapToAllowedAuthorizationEntityType(parentType);
		await this.authorizationService.checkPermissionByReferences(userId, allowedType, parentId, context);
	}

	async download(userId: EntityId, params: DownloadFileParams) {
		const entity = await this.fileRecordRepo.findOneById(params.fileRecordId);

		await this.checkPermission(userId, entity.parentType, entity.parentId, PermissionContexts.read);

		if (entity.name !== params.fileName) {
			throw new NotFoundException('File not found');
		} else if (entity.securityCheck.status === ScanStatus.BLOCKED) {
			throw new NotAcceptableException('File is blocked');
		}
		const res = await this.downloadFile(entity.schoolId, entity.id);

		return res;
	}

	async downloadBySecurityToken(token: string) {
		try {
			const entity = await this.fileRecordRepo.findBySecurityCheckRequestToken(token);
			const res = await this.downloadFile(entity.schoolId, entity.id);

			return res;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new BadRequestException(error);
		}
	}

	private checkFilenameExists(filename: string, fileRecords: FileRecord[]): string {
		let counter = 0;
		const filenameObj = path.parse(filename);
		const { name } = filenameObj;
		let newFilename = path.format(filenameObj);
		// eslint-disable-next-line @typescript-eslint/no-loop-func
		while (fileRecords.find((item: FileRecord) => item.name === newFilename)) {
			counter += 1;
			filenameObj.base = counter > 0 ? `${name} (${counter})${filenameObj.ext}` : `${name}${filenameObj.ext}`;
			newFilename = path.format(filenameObj);
		}

		return newFilename;
	}

	private async markForDelete(fileRecords: FileRecord[]): Promise<void> {
		fileRecords.forEach((fileRecord) => {
			fileRecord.markForDelete();
		});

		await this.fileRecordRepo.save(fileRecords);
	}

	private async unmarkForDelete(fileRecords: FileRecord[]): Promise<void> {
		fileRecords.forEach((fileRecord) => {
			fileRecord.unmarkForDelete();
		});

		await this.fileRecordRepo.save(fileRecords);
	}

	private async delete(fileRecords: FileRecord[]) {
		this.logger.debug({ action: 'delete', fileRecords });

		await this.markForDelete(fileRecords);
		try {
			const paths = fileRecords.map((fileRecord) => this.createPath(fileRecord.schoolId, fileRecord.id));

			await this.storageClient.delete(paths);
		} catch (err) {
			await this.unmarkForDelete(fileRecords);

			throw new InternalServerErrorException(err);
		}
	}

	async deleteFilesOfParent(userId: EntityId, params: FileRecordParams): Promise<Counted<FileRecord[]>> {
		await this.checkPermission(userId, params.parentType, params.parentId, PermissionContexts.delete);
		const [fileRecords, count] = await this.fileRecordRepo.findBySchoolIdAndParentId(params.schoolId, params.parentId);
		if (count > 0) {
			await this.delete(fileRecords);
		}

		return [fileRecords, count];
	}

	async deleteOneFile(userId: EntityId, params: SingleFileParams): Promise<FileRecord> {
		const fileRecord = await this.fileRecordRepo.findOneById(params.fileRecordId);
		await this.checkPermission(userId, fileRecord.parentType, fileRecord.parentId, PermissionContexts.delete);
		await this.delete([fileRecord]);

		return fileRecord;
	}

	async restoreFilesOfParent(userId: EntityId, params: FileRecordParams): Promise<Counted<FileRecord[]>> {
		await this.checkPermission(userId, params.parentType, params.parentId, PermissionContexts.create);
		const [fileRecords, count] = await this.fileRecordRepo.findBySchoolIdAndParentIdAndMarkedForDelete(
			params.schoolId,
			params.parentId
		);
		if (count > 0) {
			await this.restore(fileRecords);
		}
		return [fileRecords, count];
	}

	async restoreOneFile(userId: EntityId, params: SingleFileParams): Promise<FileRecord> {
		const fileRecord = await this.fileRecordRepo.findOneByIdMarkedForDelete(params.fileRecordId);
		await this.checkPermission(userId, fileRecord.parentType, fileRecord.parentId, PermissionContexts.create);
		await this.restore([fileRecord]);

		return fileRecord;
	}

	async copyFilesOfParent(
		userId: string,
		params: FileRecordParams,
		copyFilesParams: CopyFilesOfParentParams
	): Promise<Counted<FileRecord[]>> {
		await Promise.all([
			this.checkPermission(userId, params.parentType, params.parentId, PermissionContexts.create),
			this.checkPermission(
				userId,
				copyFilesParams.target.parentType,
				copyFilesParams.target.parentId,
				PermissionContexts.create
			),
		]);

		const [fileRecords, count] = await this.fileRecordRepo.findBySchoolIdAndParentId(params.schoolId, params.parentId);

		if (count === 0) {
			return [fileRecords, count];
		}

		const newRecords = await this.copy(userId, fileRecords, copyFilesParams.target);

		return newRecords;
	}

	async copyOneFile(userId: string, params: SingleFileParams, copyFileParams: CopyFileParams) {
		const fileRecord = await this.fileRecordRepo.findOneById(params.fileRecordId);
		await Promise.all([
			this.checkPermission(userId, fileRecord.parentType, fileRecord.parentId, PermissionContexts.create),
			this.checkPermission(
				userId,
				copyFileParams.target.parentType,
				copyFileParams.target.parentId,
				PermissionContexts.create
			),
		]);

		const [newRecord] = await this.copy(userId, [fileRecord], copyFileParams.target);

		return newRecord[0];
	}

	private async copy(
		userId: EntityId,
		sourceFileRecords: FileRecord[],
		targetParams: FileRecordParams
	): Promise<Counted<FileRecord[]>> {
		this.logger.debug({ action: 'copy', sourceFileRecords, targetParams });
		let newRecords: FileRecord[] = [];
		const paths: Array<ICopyFiles> = [];

		newRecords = await Promise.all(
			sourceFileRecords.map(async (item) => {
				const entity = this.getNewFileRecord(item.name, item.size, item.mimeType, targetParams, userId);
				entity.securityCheck = item.securityCheck;
				await this.fileRecordRepo.save(entity);

				paths.push({
					sourcePath: [item.schoolId, item.id].join('/'),
					targetPath: [entity.schoolId, entity.id].join('/'),
				});
				return entity;
			})
		);

		try {
			await this.storageClient.copy(paths);
			return [newRecords, newRecords.length];
		} catch (error) {
			await this.fileRecordRepo.delete(newRecords);
			throw error;
		}
	}

	private async restore(fileRecords: FileRecord[]) {
		this.logger.debug({ action: 'restore', fileRecords });

		await this.unmarkForDelete(fileRecords);
		try {
			const paths = fileRecords.map((fileRecord) => this.createPath(fileRecord.schoolId, fileRecord.id));

			await this.storageClient.restore(paths);
		} catch (err) {
			await this.markForDelete(fileRecords);
			throw new InternalServerErrorException(err);
		}
	}
}