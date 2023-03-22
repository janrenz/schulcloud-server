import { EntityId } from '@shared/domain/types';
import { Column } from './column.do';
import { BoardNodeBuildable } from './types/board-node-buildable';
import { BoardNodeBuilder } from './types/board-node-builder';

export class ColumnBoard implements ColumnBoardProps, BoardNodeBuildable {
	id: EntityId;

	title: string;

	children: Column[];

	createdAt: Date;

	updatedAt: Date;

	constructor(props: ColumnBoardProps) {
		this.id = props.id;
		this.title = props.title;
		this.children = props.children;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	addColumn(column: Column, position?: number) {
		this.children.splice(position || this.children.length, 0, column);
	}

	useBoardNodeBuilder(builder: BoardNodeBuilder): void {
		builder.buildColumnBoardNode(this);
	}
}

export interface ColumnBoardProps {
	id: EntityId;

	title: string;

	children: Column[];

	createdAt: Date;

	updatedAt: Date;
}
