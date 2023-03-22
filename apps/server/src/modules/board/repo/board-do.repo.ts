import { Utils } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { AnyBoardDo, BoardNode, BoardNodeType, EntityId } from '@shared/domain';
import { BoardDoBuilder } from '@shared/domain/entity/boardnode/board-do.builder';
import { BoardNodeBuilderImpl } from '@shared/domain/entity/boardnode/board-node-builder-impl';
import { BoardNodeRepo } from './board-node.repo';

@Injectable()
export class BoardDoRepo {
	constructor(private readonly em: EntityManager, private readonly boardNodeRepo: BoardNodeRepo) {}

	async findById(id: EntityId): Promise<AnyBoardDo> {
		const boardNode = await this.em.findOneOrFail(BoardNode, id);
		const descendants = await this.boardNodeRepo.findDescendants(boardNode);
		const domainObject = new BoardDoBuilder(descendants).buildDomainObject(boardNode);

		return domainObject;
	}

	async findByIds(ids: EntityId[]): Promise<AnyBoardDo[]> {
		const boardNodes = await this.em.find(BoardNode, { id: { $in: ids } });

		const childrenMap = await this.boardNodeRepo.findChildrenOfMany(boardNodes);

		const domainObjects = boardNodes.map((boardNode) => {
			const children = childrenMap[boardNode.pathOfChildren];
			const domainObject = new BoardDoBuilder(children).buildDomainObject(boardNode);
			return domainObject;
		});

		return domainObjects;
	}

	async save(domainObject: AnyBoardDo | AnyBoardDo[], parentId?: EntityId) {
		const domainObjects = Utils.asArray(domainObject);
		const parent = await this.getParent(parentId);
		const builder = new BoardNodeBuilderImpl(parent);
		const boardNodes = builder.buildBoardNodes(domainObjects, parent?.id);
		await this.boardNodeRepo.save(boardNodes);
	}

	private async getParent(parentId?: EntityId): Promise<BoardNode | undefined> {
		if (parentId) {
			return this.boardNodeRepo.findById(BoardNode, parentId);
		}
		return undefined;
	}

	async deleteChild<T extends AnyBoardDo>(parent: T, childId: EntityId): Promise<T> {
		if (!parent.children) {
			throw new Error('parent has no children');
		}

		const hasChild = parent.children.some((el) => el.id === childId);

		if (hasChild === false) {
			throw new Error('child does not belong to parent');
		}

		const childNode = await this.boardNodeRepo.findById(BoardNode, childId);
		const parentNode = await this.boardNodeRepo.findById(BoardNode, parent.id);

		const builder = new BoardNodeBuilderImpl(parentNode);
		parent.children = parent.children.filter((el) => el.id !== childId);
		const boardNodes = builder.buildBoardNodes(parent.children, parent.id);

		await this.boardNodeRepo.save(boardNodes);
		await this.boardNodeRepo.deleteWithDescendants(childNode);

		return parent;
	}
}
