import { DeepPartial } from '@mikro-orm/core';
import { BoardNode, BoardNodeProperties, ColumnBoardPayload } from '@shared/domain';
import { BaseFactory } from '../base.factory';
import {
	cardPayloadFactory,
	columnBoardPayloadFactory,
	columnPayloadFactory,
	textElementPayloadFactory,
} from './payload';

class BoardNodeFactory extends BaseFactory<BoardNode, BoardNodeProperties> {
	asBoard(): this {
		const params: DeepPartial<BoardNodeProperties> = {
			payload: columnBoardPayloadFactory.build(),
		};
		return this.params(params);
	}

	asColumn(): this {
		const params: DeepPartial<BoardNodeProperties> = {
			payload: columnPayloadFactory.build(),
		};
		return this.params(params);
	}

	asCard(): this {
		const params: DeepPartial<BoardNodeProperties> = {
			payload: cardPayloadFactory.build(),
		};
		return this.params(params);
	}

	asTextElement(): this {
		const params: DeepPartial<BoardNodeProperties> = {
			payload: textElementPayloadFactory.build(),
		};
		return this.params(params);
	}
}

export const boardNodeFactory = BoardNodeFactory.define(BoardNode, ({ sequence }) => {
	return {
		payload: new ColumnBoardPayload({ name: `board #${sequence}` }),
	};
});
