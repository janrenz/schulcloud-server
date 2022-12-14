import { ILoggable, LogMessage } from '@src/core/logger/interfaces/loggable';
import { SyncFileItem } from '../types';

export class FileSyncFailLoggable implements ILoggable {
	item: SyncFileItem;

	stack: string;

	constructor(item: SyncFileItem, stack: string) {
		this.item = item;
		this.stack = stack;
	}

	getLogMessage(): LogMessage {
		return {
			message: 'Error syncing file',
			data: {
				sourceFileId: this.item.source.id,
				parentId: this.item.parentId,
				stack: this.stack,
			},
		};
	}
}
