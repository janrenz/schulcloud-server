/* istanbul ignore file */

import { EntityManager, ObjectId } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { EntityId, FileRecord, FileRecordParentType, Task } from '@shared/domain';
import { SyncFileItemMapper } from '../mapper';
import { SyncFileItem, SyncFileItemData } from '../types';

// Temporary functionality for migration to new fileservice
// TODO: Remove when BC-1496 is done!
const query = (aggregationSize: number) => [
	{
		$match: { fileIds: { $exists: true, $ne: [] } },
	},
	{
		$lookup: {
			from: 'files',
			localField: 'fileIds',
			foreignField: '_id',
			as: 'files',
		},
	},
	{
		$unwind: {
			path: '$files',
		},
	},
	{
		$match: {
			'files.storageProviderId': { $exists: true },
			'files.size': { $ne: 0 },
			'files.deleted': { $ne: true },
			'files.deletedAt': null,
		},
	},
	{
		$lookup: {
			from: 'files_filerecords',
			localField: 'files._id',
			foreignField: 'fileId',
			as: 'file_filerecords',
		},
	},
	{
		$unwind: {
			path: '$file_filerecords',
			preserveNullAndEmptyArrays: true,
		},
	},
	{
		$match: {
			'file_filerecords.error': null,
		},
	},
	{
		$lookup: {
			from: 'filerecords',
			localField: 'file_filerecords.filerecordId',
			foreignField: '_id',
			as: 'filerecords',
		},
	},
	{
		$set: {
			filerecord: { $arrayElemAt: ['$filerecords', 0] },
		},
	},
	{
		$match: {
			$or: [
				{ filerecord: { $exists: false } },
				{
					$expr: {
						$gt: ['$files.updatedAt', '$filerecord.updatedAt'],
					},
				},
			],
		},
	},
	{
		$project: {
			schoolId: '$schoolId',
			file: '$files',
			filerecord: '$filerecord',
		},
	},
	{
		$sort: {
			'file.updatedAt': 1,
			'file._id': 1,
		},
	},
	{
		$limit: aggregationSize,
	},
];

@Injectable()
export class SyncFilesRepo {
	constructor(protected readonly _em: EntityManager) {}

	async findFilesToSync(parentType: FileRecordParentType, aggregationSize: number): Promise<SyncFileItem[]> {
		let itemDataList: SyncFileItemData[] = [];

		if (parentType === FileRecordParentType.Task) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			itemDataList = await this._em.aggregate(Task, query(aggregationSize));
		}

		const items = SyncFileItemMapper.mapResults(itemDataList, parentType);

		return items;
	}

	async saveAssociation(sourceId: EntityId, targetId?: EntityId, error?: string): Promise<void> {
		const filerecordId = targetId ? new ObjectId(targetId) : undefined;
		await this._em
			.getConnection()
			.insertOne('files_filerecords', { fileId: new ObjectId(sourceId), filerecordId, error });
	}

	async insertFileRecord(entity: FileRecord): Promise<void> {
		await this._em.nativeInsert(entity);
	}

	async updateFileRecord(entity: FileRecord): Promise<void> {
		await this._em.nativeUpdate(FileRecord, { _id: entity._id }, entity);
	}
}