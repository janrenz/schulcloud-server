import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { County } from './county';

export interface IFederalState {
	name: string,
	abbreviation: string,
	logoUrl: string,
	counties?: County[],
	createdAt?: Date,
	updatedAt?: Date,
}

@Entity({ tableName: 'years' })
export class FederalState extends BaseEntity implements IFederalState {
	@Property()
	name: string;

	@Property()
	abbreviation: string;

	@Property()
	logoUrl: string;

	@Property({ nullable: true })
	counties?: County[]

	@Property({ nullable: true })
	createdAt?: Date

	@Property({ nullable: true })
	updatedAt?: Date

	constructor(props: IFederalState) {
		super();
		this.name = props.name;
		this.abbreviation = props.abbreviation;
		this.logoUrl = props.logoUrl;
		this.counties = props.counties;
		this.createdAt = props.createdAt; // default = Date.now
		this.updatedAt = props.updatedAt; // default = Date.now
	}
}
