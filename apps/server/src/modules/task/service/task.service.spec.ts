import { Configuration } from '@hpi-schul-cloud/commons';

import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { MikroORM } from '@mikro-orm/core';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from '@shared/common';
import { Actions, Course, Permission, Task, User } from '@shared/domain';
import { CourseRepo, LessonRepo, TaskRepo, UserRepo } from '@shared/repo';
import {
	courseFactory,
	lessonFactory,
	setupEntities,
	submissionFactory,
	taskFactory,
	userFactory,
} from '@shared/testing';
import { AuthorizationService } from '@src/modules';
import { FileParamBuilder, FilesStorageClientAdapterService } from '@src/modules/files-storage-client';
import { SubmissionService } from './submission.service';
import { TaskService } from './task.service';

let user!: User;
let userRepo: DeepMocked<UserRepo>;
let courseRepo: DeepMocked<CourseRepo>;
let lessonRepo: DeepMocked<LessonRepo>;
let authorizationService: DeepMocked<AuthorizationService>;

describe('TaskService', () => {
	let module: TestingModule;
	let orm: MikroORM;
	let taskRepo: DeepMocked<TaskRepo>;
	let taskService: TaskService;
	let submissionService: DeepMocked<SubmissionService>;
	let fileStorageClientAdapterService: DeepMocked<FilesStorageClientAdapterService>;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [
				TaskService,
				{
					provide: TaskRepo,
					useValue: createMock<TaskRepo>(),
				},
				{ provide: AuthorizationService, useValue: createMock<AuthorizationService>() },
				{ provide: CourseRepo, useValue: createMock<CourseRepo>() },
				{ provide: LessonRepo, useValue: createMock<LessonRepo>() },
				{
					provide: UserRepo,
					useValue: createMock<UserRepo>(),
				},
				{
					provide: SubmissionService,
					useValue: createMock<SubmissionService>(),
				},
				{
					provide: FilesStorageClientAdapterService,
					useValue: createMock<FilesStorageClientAdapterService>(),
				},
			],
		}).compile();

		taskRepo = module.get(TaskRepo);
		taskService = module.get(TaskService);
		submissionService = module.get(SubmissionService);
		userRepo = module.get(UserRepo);
		courseRepo = module.get(CourseRepo);
		lessonRepo = module.get(LessonRepo);
		authorizationService = module.get(AuthorizationService);
		fileStorageClientAdapterService = module.get(FilesStorageClientAdapterService);

		orm = await setupEntities();
	});

	afterAll(async () => {
		await orm.close();
		await module.close();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('findBySingleParent', () => {
		it('should call findBySingleParent from task repo', async () => {
			const courseId = 'courseId';
			const userId = 'user-id';
			taskRepo.findBySingleParent.mockResolvedValueOnce([[], 0]);

			await expect(taskService.findBySingleParent(userId, courseId)).resolves.toEqual([[], 0]);
			expect(taskRepo.findBySingleParent).toBeCalledWith(userId, courseId, undefined, undefined);
		});
	});

	describe('delete', () => {
		const setup = () => {
			const task = taskFactory.buildWithId();
			const submissions = submissionFactory.buildList(3, { task });

			return { task, submissions };
		};

		it('should call fileStorageClientAdapterService.deleteFilesOfParent', async () => {
			const { task } = setup();

			await taskService.delete(task);

			const params = FileParamBuilder.build(task.school.id, task);
			expect(fileStorageClientAdapterService.deleteFilesOfParent).toBeCalledWith(params);
		});

		it('should call submissionService.delete() for all related submissions', async () => {
			const { task, submissions } = setup();

			await taskService.delete(task);

			expect(submissionService.delete).toBeCalledTimes(3);
			expect(submissionService.delete).toBeCalledWith(submissions[0]);
		});

		it('should call TaskRepo.delete() with Task', async () => {
			const { task } = setup();

			await taskService.delete(task);

			expect(taskRepo.delete).toBeCalledWith(task);
		});
	});

	describe('Single task', () => {
		beforeEach(() => {
			jest.spyOn(Configuration, 'get').mockImplementation((config: string) => {
				if (config === 'FEATURE_TASK_CARD_ENABLED') {
					return true;
				}
				return null;
			});
		});

		describe('create task', () => {
			let course: Course;
			beforeEach(() => {
				user = userFactory.buildWithId();
				course = courseFactory.buildWithId({ teachers: [user] });
				userRepo.findById.mockResolvedValue(user);
				courseRepo.findById.mockResolvedValue(course);
				taskRepo.save.mockResolvedValue();
				authorizationService.hasAllPermissions.mockReturnValue(true);
			});
			afterEach(() => {
				userRepo.findById.mockRestore();
				courseRepo.findById.mockRestore();
				taskRepo.save.mockRestore();
				authorizationService.hasOneOfPermissions.mockRestore();
			});

			it('should throw if availableDate is not before dueDate', async () => {
				const availableDate = new Date('2023-01-12T00:00:00');
				const dueDate = new Date('2023-01-11T00:00:00');
				const params = { name: 'test', availableDate, dueDate };
				await expect(async () => {
					await taskService.create(user.id, params);
				}).rejects.toThrow(ValidationError);
			});
			it('should check for permission to create the task', async () => {
				await taskService.create(user.id, { name: 'test' });
				expect(authorizationService.hasAllPermissions).toBeCalledWith(user, [Permission.HOMEWORK_CREATE]);
			});
			it('should throw if the user has no permission', async () => {
				authorizationService.hasAllPermissions.mockReturnValue(false);
				await expect(async () => {
					await taskService.create(user.id, { name: 'test' });
				}).rejects.toThrow(UnauthorizedException);
				authorizationService.hasAllPermissions.mockRestore();
			});
			it('should check for course permission to create the task in a course', async () => {
				await taskService.create(user.id, { name: 'test', courseId: course.id });
				expect(authorizationService.checkPermission).toBeCalledWith(user, course, {
					action: Actions.write,
					requiredPermissions: [],
				});
			});
			it('should check for lesson permission to create the task in a lesson', async () => {
				const lesson = lessonFactory.buildWithId({ course });
				lessonRepo.findById.mockResolvedValue(lesson);
				await taskService.create(user.id, { name: 'test', courseId: course.id, lessonId: lesson.id });
				expect(authorizationService.checkPermission).toBeCalledWith(user, lesson, {
					action: Actions.write,
					requiredPermissions: [],
				});
			});
			it('should throw if lesson does not belong to course', async () => {
				const lesson = lessonFactory.buildWithId();
				lessonRepo.findById.mockResolvedValue(lesson);
				await expect(async () => {
					await taskService.create(user.id, { name: 'test', courseId: course.id, lessonId: lesson.id });
				}).rejects.toThrow(BadRequestException);

				lessonRepo.findById.mockRestore();
			});
			it('should save the task', async () => {
				const taskMock = {
					name: 'test',
					creator: user,
				};
				await taskService.create(user.id, { name: 'test' });
				expect(taskRepo.save).toHaveBeenCalledWith(expect.objectContaining({ ...taskMock }));
			});
			it('should save the task with course', async () => {
				const taskMock = {
					name: 'test',
					course,
				};
				await taskService.create(user.id, { name: 'test', courseId: course.id });
				expect(taskRepo.save).toHaveBeenCalledWith(expect.objectContaining({ ...taskMock }));
			});
			it('should save the task with course and lesson', async () => {
				const lesson = lessonFactory.buildWithId({ course });
				lessonRepo.findById.mockResolvedValue(lesson);
				const taskMock = {
					name: 'test',
					course,
					lesson,
				};
				await taskService.create(user.id, { name: 'test', courseId: course.id, lessonId: lesson.id });
				expect(taskRepo.save).toHaveBeenCalledWith(expect.objectContaining({ ...taskMock }));

				lessonRepo.findById.mockRestore();
			});
			it('should return the task and its status', async () => {
				const taskMock = {
					name: 'test',
					creator: user,
					course,
				};
				authorizationService.hasPermission.mockReturnValue(true);
				const result = await taskService.create(user.id, { name: 'test', courseId: course.id });
				expect(result.task).toEqual(expect.objectContaining(taskMock));
				expect(result.status.isDraft).toEqual(true);
			});
		});
		describe('update task', () => {
			let course: Course;
			let task: Task;
			beforeEach(() => {
				user = userFactory.buildWithId();
				course = courseFactory.buildWithId({ teachers: [user] });

				task = taskFactory.build({ course });
				userRepo.findById.mockResolvedValue(user);
				courseRepo.findById.mockResolvedValue(course);

				taskRepo.findById.mockResolvedValue(task);
				taskRepo.save.mockResolvedValue();
			});

			afterEach(() => {
				userRepo.findById.mockRestore();
				courseRepo.findById.mockRestore();
				taskRepo.save.mockRestore();
				taskRepo.findById.mockRestore();
			});
			it('should throw if availableDate is not before dueDate', async () => {
				const availableDate = new Date('2023-01-12T00:00:00');
				const dueDate = new Date('2023-01-11T00:00:00');
				const params = { name: 'test', availableDate, dueDate };
				await expect(async () => {
					await taskService.update(user.id, task.id, params);
				}).rejects.toThrow(ValidationError);
			});
			it('should check for permission to update the task', async () => {
				const params = {
					name: 'test',
				};
				await taskService.update(user.id, task.id, params);
				expect(authorizationService.checkPermission).toBeCalledWith(user, task, {
					action: Actions.write,
					requiredPermissions: [Permission.HOMEWORK_EDIT],
				});
			});
			it('should check authorization for course', async () => {
				const params = {
					name: 'test',
					courseId: course.id,
				};
				await taskService.update(user.id, task.id, params);
				expect(authorizationService.checkPermission).toBeCalledWith(user, course, {
					action: Actions.write,
					requiredPermissions: [],
				});
			});
			it('should save the task with course', async () => {
				const params = {
					name: 'test',
					courseId: course.id,
				};
				await taskService.update(user.id, task.id, params);
				expect(taskRepo.save).toHaveBeenCalledWith({ ...task, name: params.name });
			});
			it('should save the task with course and lesson', async () => {
				const lesson = lessonFactory.buildWithId({ course });
				lessonRepo.findById.mockResolvedValue(lesson);
				const params = {
					name: 'test',
					courseId: course.id,
					lessonId: lesson.id,
				};
				await taskService.update(user.id, task.id, params);
				expect(taskRepo.save).toHaveBeenCalledWith({ ...task, name: params.name, lessonId: lesson.id });

				lessonRepo.findById.mockRestore();
			});
			it('should throw if lesson does not belong to course', async () => {
				const lesson = lessonFactory.buildWithId();
				lessonRepo.findById.mockResolvedValue(lesson);
				const params = {
					name: 'test',
					courseId: course.id,
					lessonId: lesson.id,
				};
				await expect(async () => {
					await taskService.update(user.id, task.id, params);
				}).rejects.toThrow(BadRequestException);

				lessonRepo.findById.mockRestore();
			});
			it('should return the updated task', async () => {
				const params = {
					name: 'test',
					courseId: course.id,
				};
				const result = await taskService.update(user.id, task.id, params);
				expect(result.task).toEqual({ ...task, name: params.name });
				expect(result.status).toBeDefined();
			});
		});
		describe('find task', () => {
			let task: Task;
			beforeEach(() => {
				user = userFactory.buildWithId();
				task = taskFactory.build();
				userRepo.findById.mockResolvedValue(user);
				taskRepo.findById.mockResolvedValue(task);
			});
			it('should check for permission to view the task', async () => {
				await taskService.find(user.id, task.id);
				expect(authorizationService.checkPermission).toBeCalledWith(user, task, {
					action: Actions.read,
					requiredPermissions: [Permission.HOMEWORK_VIEW],
				});
			});
			it('should check also user permission to edit task', async () => {
				await taskService.find(user.id, task.id);
				expect(authorizationService.hasOneOfPermissions).toBeCalledWith(user, [Permission.HOMEWORK_EDIT]);
			});
			it('should return the task with its status for student if user has only view permission', async () => {
				authorizationService.hasOneOfPermissions.mockReturnValue(false);

				const result = await taskService.find(user.id, task.id);
				expect(result.task).toEqual(task);
				expect(result.status).toBeDefined();
			});
			it('should return the task with its status for student if user has only edit permission', async () => {
				authorizationService.hasOneOfPermissions.mockReturnValue(true);

				const result = await taskService.find(user.id, task.id);
				expect(result.task).toEqual(task);
				expect(result.status).toBeDefined();
			});
		});
	});
});