import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotAcceptableException,
	NotFoundException,
} from '@nestjs/common';
import { BaseAuthorisationLoaderService, Counted, EntityId, IFindOptions } from '@shared/domain';
import { AntivirusService } from '@shared/infra/antivirus/antivirus.service';
import { Logger } from '@src/core/logger';
import { S3ClientAdapter } from '../client/s3-client.adapter';
import {
	CopyFileResponse,
	CopyFilesOfParentParams,
	DownloadFileParams,
	FileRecordParams,
	RenameFileParams,
	ScanResultParams,
	SingleFileParams,
} from '../controller/dto';
import { FileDto } from '../dto';
import { FileRecordDO, FileRecordDOParams } from '../entity';
import { ErrorType } from '../error';
import {
	getFileRecordParams,
	createICopyFiles,
	createPath,
	deriveStatusFromSource,
	getPaths,
	getStatusFromScanResult,
	markForDelete,
	resolveFileNameDuplicates,
	unmarkForDelete,
} from '../helper';
import { IGetFileResponse } from '../interface';
import { FilesStorageMapper, CopyFileResponseBuilder } from '../mapper';

// TODO: Ticket for rename EntityId to more generic Name

export interface IFilesStorageRepo {
	findOneById(id: EntityId): Promise<FileRecordDO>;

	findOneByIdMarkedForDelete(id: EntityId): Promise<FileRecordDO>;

	findBySchoolIdAndParentId(
		schoolId: EntityId,
		parentId: EntityId,
		options?: IFindOptions<FileRecordDO>
	): Promise<Counted<FileRecordDO[]>>;

	findBySchoolIdAndParentIdAndMarkedForDelete(
		schoolId: EntityId,
		parentId: EntityId,
		options?: IFindOptions<FileRecordDO>
	): Promise<Counted<FileRecordDO[]>>;

	findBySecurityCheckRequestToken(token: string): Promise<FileRecordDO>;

	delete(FileRecord: FileRecordDO[]): Promise<void>;

	save(FileRecord: FileRecordDOParams[]): Promise<FileRecordDO[]>;

	update(fileRecordDOs: FileRecordDO[]): Promise<void>;
}

@Injectable()
export class FilesStorageService {
	// extends BaseAuthorisationLoaderService<FileRecordDO>
	constructor(
		private readonly fileRecordRepo: IFilesStorageRepo,
		private readonly storageClient: S3ClientAdapter,
		private readonly antivirusService: AntivirusService,
		private logger: Logger
	) {
		this.logger.setContext(FilesStorageService.name);
	}

	// find
	public async getFileRecord(params: SingleFileParams): Promise<FileRecordDO> {
		const fileRecord = await this.fileRecordRepo.findOneById(params.fileRecordId);

		return fileRecord;
	}

	public async getFileRecordBySecurityCheckRequestToken(token: string): Promise<FileRecordDO> {
		const fileRecord = await this.fileRecordRepo.findBySecurityCheckRequestToken(token);

		return fileRecord;
	}

	public async getFileRecordMarkedForDelete(params: SingleFileParams): Promise<FileRecordDO> {
		const fileRecord = await this.fileRecordRepo.findOneByIdMarkedForDelete(params.fileRecordId);

		return fileRecord;
	}

	public async getFileRecordsOfParent(params: FileRecordParams): Promise<Counted<FileRecordDO[]>> {
		const countedFileRecords = await this.fileRecordRepo.findBySchoolIdAndParentId(params.schoolId, params.parentId);

		return countedFileRecords;
	}

	// upload
	public async createFileInStorageAndRollbackOnError(
		fileRecord: FileRecordDO,
		params: FileRecordParams,
		fileDescription: FileDto
	): Promise<FileRecordDO> {
		try {
			const filePath = createPath(params.schoolId, fileRecord.id);
			await this.storageClient.create(filePath, fileDescription);
			this.antivirusService.send(fileRecord);

			return fileRecord;
		} catch (error) {
			await this.fileRecordRepo.delete([fileRecord]);
			throw error;
		}
	}

	public async uploadFile(userId: EntityId, params: FileRecordParams, fileDescription: FileDto): Promise<FileRecordDO> {
		const [fileRecords] = await this.getFileRecordsOfParent(params);
		const fileName = resolveFileNameDuplicates(fileDescription.name, fileRecords);
		const fileRecordParams = getFileRecordParams(
			fileName,
			fileDescription.size,
			fileDescription.mimeType,
			params,
			userId
		);

		// return a array
		// TODO: update?
		const [fileRecordDO] = await this.fileRecordRepo.save([fileRecordParams]);
		await this.createFileInStorageAndRollbackOnError(fileRecordDO, params, fileDescription);

		return fileRecordDO;
	}

	// update
	private checkDuplicatedNames(fileRecords: FileRecordDO[], newFileName: string): void {
		if (fileRecords.find((item) => item.hasSameName(newFileName))) {
			throw new ConflictException(ErrorType.FILE_NAME_EXISTS);
		}
	}

	public async patchFilename(fileRecord: FileRecordDO, data: RenameFileParams): Promise<FileRecordDO> {
		const fileRecordParams = FilesStorageMapper.mapFileRecordToFileRecordParams(fileRecord);
		const [fileRecords] = await this.getFileRecordsOfParent(fileRecordParams);

		this.checkDuplicatedNames(fileRecords, data.fileName);
		fileRecord.setName(data.fileName);
		await this.fileRecordRepo.update([fileRecord]);

		return fileRecord;
	}

	public async updateSecurityStatus(token: string, scanResultDto: ScanResultParams) {
		const fileRecord = await this.fileRecordRepo.findBySecurityCheckRequestToken(token);

		const status = getStatusFromScanResult(scanResultDto);
		fileRecord.updateSecurityCheckStatus(status, scanResultDto.virus_signature);

		await this.fileRecordRepo.update([fileRecord]);
	}

	// download
	private checkFileName(fileRecordDO: FileRecordDO, params: DownloadFileParams): void | NotFoundException {
		if (fileRecordDO.hasSameName(params.fileName)) {
			this.logger.debug(`could not find file with id: ${fileRecordDO.id} by filename`);
			throw new NotFoundException(ErrorType.FILE_NOT_FOUND);
		}
	}

	private checkScanStatus(fileRecordDO: FileRecordDO): void | NotAcceptableException {
		if (fileRecordDO.isBlocked()) {
			this.logger.warn(`file is blocked with id: ${fileRecordDO.id}`);
			throw new NotAcceptableException(ErrorType.FILE_IS_BLOCKED);
		}
	}

	public async downloadFile(
		schoolId: EntityId,
		fileRecordId: EntityId,
		bytesRange?: string
	): Promise<IGetFileResponse> {
		const pathToFile = createPath(schoolId, fileRecordId);
		const response = await this.storageClient.get(pathToFile, bytesRange);

		return response;
	}

	public async download(
		fileRecord: FileRecordDO,
		params: DownloadFileParams,
		bytesRange?: string
	): Promise<IGetFileResponse> {
		this.checkFileName(fileRecord, params);
		this.checkScanStatus(fileRecord);

		const response = await this.downloadFile(fileRecord.getSchoolId(), fileRecord.id, bytesRange);

		return response;
	}

	// delete
	private async deleteFilesInFilesStorageClient(fileRecords: FileRecordDO[]) {
		const paths = getPaths(fileRecords);

		await this.storageClient.delete(paths);
	}

	private async deleteWithRollbackByError(fileRecords: FileRecordDO[]): Promise<void> {
		try {
			await this.deleteFilesInFilesStorageClient(fileRecords);
		} catch (error) {
			await this.fileRecordRepo.update(fileRecords);
			throw new InternalServerErrorException(error, `${FilesStorageService.name}:delete`);
		}
	}

	public async delete(fileRecords: FileRecordDO[]) {
		this.logger.debug({ action: 'delete', fileRecords });

		markForDelete(fileRecords);
		await this.fileRecordRepo.update(fileRecords);

		await this.deleteWithRollbackByError(fileRecords);
	}

	public async deleteFilesOfParent(params: FileRecordParams): Promise<Counted<FileRecordDO[]>> {
		const [fileRecords, count] = await this.getFileRecordsOfParent(params);

		if (count > 0) {
			await this.delete(fileRecords);
		}

		return [fileRecords, count];
	}

	// restore
	private async restoreFilesInFileStorageClient(fileRecords: FileRecordDO[]) {
		const paths = getPaths(fileRecords);

		await this.storageClient.restore(paths);
	}

	private async restoreWithRollbackByError(fileRecords: FileRecordDO[]): Promise<void> {
		try {
			await this.restoreFilesInFileStorageClient(fileRecords);
		} catch (err) {
			markForDelete(fileRecords);
			await this.fileRecordRepo.update(fileRecords);
			throw new InternalServerErrorException(err, `${FilesStorageService.name}:restore`);
		}
	}

	public async restoreFilesOfParent(params: FileRecordParams): Promise<Counted<FileRecordDO[]>> {
		const [fileRecords, count] = await this.fileRecordRepo.findBySchoolIdAndParentIdAndMarkedForDelete(
			params.schoolId,
			params.parentId
		);

		if (count > 0) {
			await this.restore(fileRecords);
		}
		return [fileRecords, count];
	}

	public async restore(fileRecords: FileRecordDO[]) {
		this.logger.debug({ action: 'restore', fileRecords });

		unmarkForDelete(fileRecords);
		await this.fileRecordRepo.update(fileRecords);

		await this.restoreWithRollbackByError(fileRecords);
	}

	// copy
	public async copyFilesOfParent(
		userId: string,
		params: FileRecordParams,
		copyFilesParams: CopyFilesOfParentParams
	): Promise<Counted<CopyFileResponse[]>> {
		const [fileRecords, count] = await this.fileRecordRepo.findBySchoolIdAndParentId(params.schoolId, params.parentId);

		if (count === 0) {
			return [[], 0];
		}

		const response = await this.copy(userId, fileRecords, copyFilesParams.target);

		return [response, count];
	}

	public async copyFileRecord(
		sourceFile: FileRecordDO,
		targetParams: FileRecordParams,
		userId: EntityId
	): Promise<FileRecordDO> {
		const { size, mimeType, name } = sourceFile.getDescriptions();
		const params = getFileRecordParams(name, size, mimeType, targetParams, userId);

		params.securityCheck = deriveStatusFromSource(sourceFile, params);

		const [fileRecordDO] = await this.fileRecordRepo.save([params]);

		return fileRecordDO;
	}

	private sendToAntiVirusService(sourceFile: FileRecordDO) {
		if (sourceFile.isPending()) {
			this.antivirusService.send(sourceFile);
		}
	}

	public async copyFilesWithRollbackOnError(
		sourceFile: FileRecordDO,
		targetFile: FileRecordDO
	): Promise<CopyFileResponse> {
		try {
			const paths = createICopyFiles(sourceFile, targetFile);

			await this.storageClient.copy([paths]);
			this.sendToAntiVirusService(sourceFile);
			const copyFileResponse = CopyFileResponseBuilder.build(targetFile.id, sourceFile.id, targetFile.getName());

			return copyFileResponse;
		} catch (error) {
			await this.fileRecordRepo.delete([targetFile]);
			throw error;
		}
	}

	public async copy(
		userId: EntityId,
		sourceFileRecords: FileRecordDO[],
		targetParams: FileRecordParams
	): Promise<CopyFileResponse[]> {
		this.logger.debug({ action: 'copy', sourceFileRecords, targetParams });

		const promises: Promise<CopyFileResponse>[] = sourceFileRecords.map(async (sourceFile) => {
			try {
				this.checkScanStatus(sourceFile);

				const targetFile = await this.copyFileRecord(sourceFile, targetParams, userId);
				const fileResponse = await this.copyFilesWithRollbackOnError(sourceFile, targetFile);

				return fileResponse;
			} catch (error) {
				this.logger.error(`copy file failed for source fileRecordId ${sourceFile.id}`, error);
				return {
					sourceId: sourceFile.id,
					name: sourceFile.getName(),
				};
			}
		});

		const settledPromises = await Promise.all(promises);

		return settledPromises;
	}
}
