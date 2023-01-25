import { EntityId } from '@shared/domain';
import { FileRecordDO } from '../entity';
import { ErrorType } from '../error';
import { ICopyFiles } from '../interface';

export function createPath(schoolId: EntityId, fileRecordId: EntityId): string {
	if (!schoolId || !fileRecordId) {
		throw new Error(ErrorType.COULD_NOT_CREATE_PATH);
	}

	const path = [schoolId, fileRecordId].join('/');

	return path;
}

export function getPaths(fileRecords: FileRecordDO[]): string[] {
	const paths = fileRecords.map((fileRecord) => createPath(fileRecord.getSchoolId(), fileRecord.id));

	return paths;
}

export function createICopyFiles(sourceFile: FileRecordDO, targetFile: FileRecordDO): ICopyFiles {
	const iCopyFiles = {
		sourcePath: createPath(sourceFile.getSchoolId(), sourceFile.id),
		targetPath: createPath(targetFile.getSchoolId(), targetFile.id),
	};

	return iCopyFiles;
}
