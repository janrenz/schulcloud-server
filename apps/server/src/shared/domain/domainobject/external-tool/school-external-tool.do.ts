import { CustomParameterEntryDO } from './custom-parameter-entry.do';
import { BaseDO } from '../base.do';

export class SchoolExternalToolDO extends BaseDO {
	createdAt?: Date;

	updatedAt?: Date;

	toolId: string;

	schoolId: string;

	parameters: CustomParameterEntryDO[];

	toolVersion: number;

	constructor(domainObject: SchoolExternalToolDO) {
		super(domainObject.id);

		this.createdAt = domainObject.createdAt;
		this.updatedAt = domainObject.updatedAt;
		this.toolId = domainObject.toolId;
		this.schoolId = domainObject.schoolId;
		this.parameters = domainObject.parameters;
		this.toolVersion = domainObject.toolVersion;
	}
}
