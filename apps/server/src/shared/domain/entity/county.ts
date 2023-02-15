import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

export interface ICounty {
	countyId?: number,
	name?: string,
	antaresKey?: string,
}

@Entity({ tableName: 'years' })
export class County extends BaseEntity implements ICounty {
	@Property({ nullable: true })
	name?: string;

	@Property({ nullable: true })
	countyId?: number;

	@Property({ nullable: true })
	antaresKey?: string;

	constructor(props: ICounty) {
		super();
		this.name = props.name;
		this.countyId = props.countyId;
		this.antaresKey = props.antaresKey;
	}
}
