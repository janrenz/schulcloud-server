// TODO: move to repo folder

import { Embeddable, Embedded, Entity, Enum, Index, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { BaseEntity, type EntityId } from '@shared/domain';
import { v4 as uuid } from 'uuid';
import { FileRecordParentType, ScanStatus } from '../domain/filerecord.do';

export interface IFileSecurityCheckProperties {
	status?: ScanStatus;
	reason?: string;
	requestToken?: string;
}
@Embeddable()
export class FileSecurityCheck {
	@Enum()
	status: ScanStatus = ScanStatus.PENDING;

	@Property()
	reason = 'not yet scanned';

	@Property()
	requestToken?: string = uuid();

	@Property()
	createdAt = new Date();

	@Property()
	updatedAt = new Date();

	constructor(props: IFileSecurityCheckProperties = {}) {
		if (props.status !== undefined) {
			this.status = props.status;
		}
		if (props.reason !== undefined) {
			this.reason = props.reason;
		}
		if (props.requestToken !== undefined) {
			this.requestToken = props.requestToken;
		}
	}
}

// connection to the props from DO
// important to allow id optional
export interface IFileRecordProperties {
	id?: EntityId;
	size: number;
	name: string;
	mimeType: string;
	parentType: FileRecordParentType;
	parentId: EntityId | ObjectId;
	creatorId: EntityId | ObjectId;
	lockedForUserId?: EntityId | ObjectId;
	schoolId: EntityId | ObjectId;
	deletedSince?: Date;
}

/**
 * Note: The file record entity will not manage any entity relations by itself.
 * That's why we do not map any relations in the entity class
 * and instead just use the plain object ids.
 */
@Entity({ tableName: 'filerecords' })
@Index({ properties: ['_schoolId', '_parentId'], options: { background: true } })
// https://github.com/mikro-orm/mikro-orm/issues/1230
@Index({ options: { 'securityCheck.requestToken': 1 } })
// Temporary functionality for migration to new fileservice
// TODO: Adjust when BC-1496 is done!
// FileRecord must inherit from BaseEntity and we have to take care of the timestamps manually.
// This is necessary while the syncing of files and filerecords goes on,
// because with BaseEntityWithTimestamps it is not possible to override the updatedAt hook.
// TODO: Find better naming, instead of Entity
export class FileRecordEntity extends BaseEntity {
	@Index({ options: { expireAfterSeconds: 7 * 24 * 60 * 60 } })
	@Property({ nullable: true })
	deletedSince?: Date;

	@Property()
	size: number;

	@Property()
	name: string;

	@Property()
	mimeType: string; // TODO mime-type enum?

	@Embedded(() => FileSecurityCheck, { object: true, nullable: false })
	securityCheck: FileSecurityCheck;

	@Index()
	@Enum()
	parentType: FileRecordParentType;

	@Index()
	@Property({ fieldName: 'parent' })
	_parentId: ObjectId;

	get parentId(): EntityId {
		return this._parentId.toHexString();
	}

	@Property({ fieldName: 'creator' })
	_creatorId: ObjectId;

	get creatorId(): EntityId {
		return this._creatorId.toHexString();
	}

	// todo: permissions

	// for wopi, is this still needed?
	@Property({ fieldName: 'lockedForUser', nullable: true })
	_lockedForUserId?: ObjectId;

	get lockedForUserId(): EntityId | undefined {
		return this._lockedForUserId?.toHexString();
	}

	@Property({ fieldName: 'school' })
	_schoolId: ObjectId;

	get schoolId(): EntityId {
		return this._schoolId.toHexString();
	}

	// Temporary functionality for migration to new fileservice
	// TODO: Remove when BC-1496 is done!
	@Property()
	createdAt = new Date();

	@Property()
	updatedAt = new Date();

	constructor(props: IFileRecordProperties) {
		// important when we go over constructor to also allow entity creating with ID
		super();
		this.size = props.size;
		this.name = props.name;
		this.mimeType = props.mimeType;
		this.parentType = props.parentType;
		this._parentId = new ObjectId(props.parentId);
		this._creatorId = new ObjectId(props.creatorId);
		if (props.lockedForUserId !== undefined) {
			this._lockedForUserId = new ObjectId(props.lockedForUserId);
		}
		this._schoolId = new ObjectId(props.schoolId);
		this.securityCheck = new FileSecurityCheck({});
		this.deletedSince = props.deletedSince;
	}
}