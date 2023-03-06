import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { BoardNode } from '@shared/domain';
import { boardNodeFactory, cardPayloadFactory, columnPayloadFactory, textElementPayloadFactory } from '@shared/testing';

@Injectable()
export class BoardManagementUc {
	constructor(private em: EntityManager) {}

	async createBoards(): Promise<void> {
		const board = boardNodeFactory.asBoard().build();
		await this.em.persistAndFlush(board);

		const columns = this.createColumns(3, board);
		await this.em.persistAndFlush(columns);

		const cardsPerColumn = columns.map((column) => this.createCards(this.random(5, 10), column));
		const cards = cardsPerColumn.flat();
		await this.em.persistAndFlush(cards);

		const elementsPerCard = cards.map((card) => this.createElements(this.random(2, 5), card));
		const elements = elementsPerCard.flat();
		await this.em.persistAndFlush(elements);
	}

	private createColumns(amount: number, parent: BoardNode): BoardNode[] {
		return this.generateArray(amount, (i) =>
			boardNodeFactory.asColumn().build({
				parent,
				payload: columnPayloadFactory.build({ title: `Column ${i + 1}` }),
			})
		);
	}

	private createCards(amount: number, parent: BoardNode): BoardNode[] {
		return this.generateArray(amount, (i) =>
			boardNodeFactory.asCard().build({
				parent,
				payload: cardPayloadFactory.build({
					title: `Card ${i + 1}`,
					height: this.random(50, 250),
				}),
			})
		);
	}

	private createElements(amount: number, parent: BoardNode): BoardNode[] {
		return this.generateArray(amount, (i) =>
			boardNodeFactory.asTextElement().build({
				parent,
				payload: textElementPayloadFactory.build({
					text: `<p>text ${i + 1}</p>`,
				}),
			})
		);
	}

	private generateArray<T>(length: number, fn: (i: number) => T) {
		return [...Array(length).keys()].map((_, i) => fn(i));
	}

	private random(min: number, max: number): number {
		return Math.floor(Math.random() * (max + min - 1) + min);
	}
}
