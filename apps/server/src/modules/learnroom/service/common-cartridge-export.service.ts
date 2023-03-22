import internal from 'stream';
import { Injectable } from '@nestjs/common';
import { EntityId, Lesson, Task } from '@shared/domain';
import { LessonService } from '@src/modules/lesson/service';
import { TaskService } from '@src/modules/task/service/task.service';
import { ICommonCartridgeAssignmentProps } from '@src/modules/learnroom/common-cartridge/common-cartridge-assignment-element';
import { FileDto, FilesStorageClientAdapterService } from '@src/modules/files-storage-client';
import { FileRecordParentType } from '@src/modules/files-storage/entity';
import { FilesStorageUC } from '@src/modules/files-storage/uc';
import { CourseService } from './course.service';
import {
	ICommonCartridgeOrganizationProps,
	CommonCartridgeFileBuilder,
	ICommonCartridgeWebContentProps,
} from '../common-cartridge';

type InternalFileInfoType = {
	id: string;
	name: string;
	data: internal.Readable;
};

@Injectable()
export class CommonCartridgeExportService {
	constructor(
		private readonly courseService: CourseService,
		private readonly lessonService: LessonService,
		private readonly taskService: TaskService,
		private readonly filesStorageClientAdapterService: FilesStorageClientAdapterService,
		private readonly filesStorageUC: FilesStorageUC
	) {}

	async exportCourse(courseId: EntityId, userId: EntityId): Promise<Buffer> {
		const course = await this.courseService.findById(courseId);
		const [lessons] = await this.lessonService.findByCourseIds([courseId]);
		const [tasks] = await this.taskService.findBySingleParent(userId, courseId);
		const param = {
			parentType: FileRecordParentType.Course,
			schoolId: 'school123',
			parentId: '633d5acdda646580679dc448',
		};
		const fileInfos = await this.filesStorageClientAdapterService.listFilesOfParent(param);
		const webContent = await this.mapToWebContent(fileInfos, userId);

		const builder = new CommonCartridgeFileBuilder({
			identifier: `i${course.id}`,
			title: course.name,
		})
			.addOrganizationItems(this.mapLessonsToOrganizationItems(lessons))
			.addAssignments(this.mapTasksToAssignments(tasks))
			.addWebContentItems(webContent);
		return builder.build();
	}

	private mapLessonsToOrganizationItems(lessons: Lesson[]): ICommonCartridgeOrganizationProps[] {
		return lessons.map((lesson) => {
			return {
				identifier: `i${lesson.id}`,
				title: lesson.name,
			};
		});
	}

	private mapTasksToAssignments(tasks: Task[]): ICommonCartridgeAssignmentProps[] {
		return tasks.map((task) => {
			return {
				identifier: `i${task.id}`,
				title: task.name,
				description: task.description,
			};
		});
	}

	private async mapToWebContent(fileInfos: FileDto[], userId: EntityId): Promise<ICommonCartridgeWebContentProps[]> {
		const webContentProps: ICommonCartridgeWebContentProps[] = [];
		for (const fileInfo of fileInfos) {
			// TODO async download
			// eslint-disable-next-line no-await-in-loop
			const file = await this.filesStorageUC.download(userId, {
				fileRecordId: fileInfo.id,
				fileName: fileInfo.name,
			});

			webContentProps.push({
				identifier: `i${fileInfo.id}`,
				href: fileInfo.name,
				// eslint-disable-next-line no-await-in-loop
				file: await this.stream2buffer(file.data),
			});
		}
		return webContentProps;
	}

	private async stream2buffer(readable: internal.Readable): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			const buffer = Array<unknown>();
			readable.on('data', (chunk) => buffer.push(chunk));
			readable.on('end', () => resolve(Buffer.concat(buffer as Uint8Array[])));
			readable.on('error', (err) => reject(err));
		});
	}

}
