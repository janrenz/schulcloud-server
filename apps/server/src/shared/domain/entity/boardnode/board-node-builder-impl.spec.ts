import { cardNodeFactory, columnBoardNodeFactory, columnNodeFactory, setupEntities } from '@shared/testing';
import {
	cardFactory,
	columnBoardFactory,
	columnFactory,
	textElementFactory,
} from '@shared/testing/factory/domainobject';
import { BoardNodeBuilderImpl } from './board-node-builder-impl';
import { BoardNodeType } from './types';

describe(BoardNodeBuilderImpl.name, () => {
	beforeAll(async () => {
		await setupEntities();
	});

	describe('when building Columns', () => {
		const setup = () => {
			const columnBoard = columnBoardFactory.buildWithId();

			const builder = new BoardNodeBuilderImpl();

			return { builder, columnBoard };
		};

		it('should build a column boardNode', () => {
			const { builder, columnBoard } = setup();

			const boardNodes = builder.buildBoardNodes([columnBoard]);
			expect(boardNodes).toHaveLength(1);
			expect(boardNodes[0].id).toBe(columnBoard.id);
			expect(boardNodes[0].type).toBe(BoardNodeType.COLUMN_BOARD);
		});
	});

	describe('when building Columns', () => {
		const setup = () => {
			const column = columnFactory.buildWithId();
			const columnBoardNode = columnBoardNodeFactory.buildWithId();

			const builder = new BoardNodeBuilderImpl(columnBoardNode);

			return { builder, column, parentId: columnBoardNode.id };
		};

		it('should build a column boardNode', () => {
			const { builder, column, parentId } = setup();

			const boardNodes = builder.buildBoardNodes([column], parentId);
			expect(boardNodes).toHaveLength(1);
			expect(boardNodes[0].id).toBe(column.id);
			expect(boardNodes[0].type).toBe(BoardNodeType.COLUMN);
		});
	});

	describe('when building Cards', () => {
		const setup = () => {
			const elements = textElementFactory.buildListWithId(3);
			const card = cardFactory.buildWithId({ elements });
			const columnNode = columnNodeFactory.buildWithId();

			const builder = new BoardNodeBuilderImpl(columnNode);

			return { builder, card, parentId: columnNode.id, elements };
		};

		it('should build a card boardnode', () => {
			const { builder, card, parentId } = setup();

			const boardNodes = builder.buildBoardNodes([card], parentId);
			expect(boardNodes[0].id).toBe(card.id);
			expect(boardNodes[0].type).toBe(BoardNodeType.CARD);
		});

		it('should build nodes for each element of the card', () => {
			const { builder, card, parentId, elements } = setup();

			const boardNodes = builder.buildBoardNodes([card], parentId);

			expect(boardNodes.length).toEqual(elements.length + 1);
			elements.forEach((currentElement) => {
				const foundElement = boardNodes.find((node) => node.id === currentElement.id);
				expect(foundElement).toBeDefined();
			});
		});
	});

	describe('when building TextElements', () => {
		const setup = () => {
			const textElement = textElementFactory.buildWithId();
			const cardNode = cardNodeFactory.buildWithId();

			const builder = new BoardNodeBuilderImpl(cardNode);

			return { builder, textElement, cardId: cardNode.id };
		};

		it('should build a text element boardnode', () => {
			const { builder, textElement, cardId } = setup();

			const boardNodes = builder.buildBoardNodes([textElement], cardId);
			expect(boardNodes).toHaveLength(1);
			expect(boardNodes[0].id).toBe(textElement.id);
			expect(boardNodes[0].type).toBe(BoardNodeType.TEXT_ELEMENT);
		});
	});

	describe('ensure board node type', () => {
		const setup = () => {
			const cardNode = cardNodeFactory.buildWithId();

			const builder = new BoardNodeBuilderImpl();

			return { builder, cardNode };
		};

		it('should do nothing if type is correct', () => {
			const { builder, cardNode } = setup();
			expect(() => builder.ensureBoardNodeType(cardNode, BoardNodeType.CARD)).not.toThrowError();
		});

		it('should throw error if wrong type', () => {
			const { builder, cardNode } = setup();
			expect(() => builder.ensureBoardNodeType(cardNode, BoardNodeType.COLUMN)).toThrowError();
		});

		it('should do nothing if one of the valid types is met', () => {
			const { builder, cardNode } = setup();
			expect(() => builder.ensureBoardNodeType(cardNode, BoardNodeType.COLUMN, BoardNodeType.CARD)).not.toThrowError();
		});
	});
});
