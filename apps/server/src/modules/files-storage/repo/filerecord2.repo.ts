import { MongoEntityManager } from '@mikro-orm/mongodb';
import { BaseRepo2, Counted, EntityId, IFindOptions, SortOrder } from '@shared/domain';
import { FileRecordDO, FileRecordDOParams } from '../entity';
import { IFilesStorageRepo } from '../service/files-storage.service';
import { FileRecord, IFileRecordProperties } from '../entity/filerecord.entity';
import { FileRecordDOMapper } from './fileRecordDO.mapper';
import { FileRecordScope } from './filerecord-scope';

function getArray<T>(input: T | T[]): T[] {
	const result = Array.isArray(input) ? input : [input];

	return result;
}

export class FileRecordRepo extends BaseRepo2<FileRecordDO> implements IFilesStorageRepo {
	constructor(private readonly em: MongoEntityManager) {
		super();
	}

	public async findOneById(id: EntityId): Promise<FileRecordDO> {
		const scope = new FileRecordScope().byFileRecordId(id).byMarkedForDelete(false);
		const fileRecordDO = await this.findOneOrFail(scope);

		return fileRecordDO;
	}

	public async findOneByIdMarkedForDelete(id: EntityId): Promise<FileRecordDO> {
		const scope = new FileRecordScope().byFileRecordId(id).byMarkedForDelete(true);
		const fileRecordDO = await this.findOneOrFail(scope);

		return fileRecordDO;
	}

	public async findBySchoolIdAndParentId(
		schoolId: EntityId,
		parentId: EntityId,
		options?: IFindOptions<FileRecordDO>
	): Promise<Counted<FileRecordDO[]>> {
		const scope = new FileRecordScope().bySchoolId(schoolId).byParentId(parentId).byMarkedForDelete(false);
		const result = await this.findAndCount(scope, options);

		return result;
	}

	public async findBySchoolIdAndParentIdAndMarkedForDelete(
		schoolId: EntityId,
		parentId: EntityId,
		options?: IFindOptions<FileRecordDO>
	): Promise<Counted<FileRecordDO[]>> {
		const scope = new FileRecordScope().bySchoolId(schoolId).byParentId(parentId).byMarkedForDelete(true);
		const result = await this.findAndCount(scope, options);

		return result;
	}

	public async findBySecurityCheckRequestToken(token: string): Promise<FileRecordDO> {
		// Must also find expires in future. Please do not add .byExpires().
		const scope = new FileRecordScope().bySecurityCheckRequestToken(token);

		const fileRecord = await this.findOneOrFail(scope);

		return fileRecord;
	}

	public async delete(fileRecordDOs: FileRecordDO[]): Promise<void> {
		const asArray = getArray(fileRecordDOs);
		/*
		const entityIdentifiere: FileRecord[] = asArray.map<FileRecord>((do) => {
			return this.em.getReference(FileRecord, do.id);
		});
		*/

		// param = DOs
		// map to array?
		// load entities ?
		// removeAndFlush
		await Promise.resolve();

		// await this.em.removeAndFlush(entityIdentifiere);
	}

	public async update(fileRecordDOs: FileRecordDO[]): Promise<void> {
		// param = DO
		// toArray
		// map to entity
		// load entities
		// override keys?
		// persistAndFlush
		// return DO ?? -> no
		await Promise.resolve();
	}

	public async save(fileRecordDOParams: FileRecordDOParams[]): Promise<FileRecordDO[]> {
		const params = getArray(fileRecordDOParams);
		const entities = params.map((param) => this.entityFactory(param));

		await this.em.persistAndFlush(entities);

		const fileRecordDOs = FileRecordDOMapper.entitiesToDOs(entities);

		return fileRecordDOs;
	}

	private entityFactory(props: IFileRecordProperties): FileRecord {
		return new FileRecord(props);
	}

	private async findAndCount(
		scope: FileRecordScope,
		options?: IFindOptions<FileRecord>
	): Promise<Counted<FileRecordDO[]>> {
		const { pagination } = options || {};
		const order = { createdAt: SortOrder.desc, id: SortOrder.asc };

		const [fileRecords, count] = await this.em.findAndCount(FileRecord, scope.query, {
			offset: pagination?.skip,
			limit: pagination?.limit,
			orderBy: order,
		});

		const fileRecordDOs = FileRecordDOMapper.entitiesToDOs(fileRecords);

		return [fileRecordDOs, count];
	}

	private async findOneOrFail(scope: FileRecordScope): Promise<FileRecordDO> {
		const filesRecordEntity = await this.em.findOneOrFail(FileRecord, scope.query);
		const fileRecordDO = FileRecordDOMapper.entityToDO(filesRecordEntity);

		return fileRecordDO;
	}
}
