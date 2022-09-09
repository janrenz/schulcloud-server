import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Configuration } from '@hpi-schul-cloud/commons';
import { MikroORM } from '@mikro-orm/core';
import { ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Actions, CopyHelperService, EtherpadService, LessonCopyService, PermissionTypes, User } from '@shared/domain';
import { Permission } from '@shared/domain/interface/permission.enum';
import { FileCopyAppendService } from '@shared/domain/service/file-copy-append.service';
import { CopyElementType, CopyStatusEnum } from '@shared/domain/types';
import { CourseRepo, LessonRepo, UserRepo } from '@shared/repo';
import { courseFactory, lessonFactory, setupEntities, userFactory } from '@shared/testing';
import { AuthorizationService } from '@src/modules/authorization';
import { LessonCopyUC } from './lesson-copy.uc';

describe('lesson copy uc', () => {
	let orm: MikroORM;
	let uc: LessonCopyUC;
	let userRepo: DeepMocked<UserRepo>;
	let lessonRepo: DeepMocked<LessonRepo>;
	let courseRepo: DeepMocked<CourseRepo>;
	let authorisation: DeepMocked<AuthorizationService>;
	let lessonCopyService: DeepMocked<LessonCopyService>;
	let copyHelperService: DeepMocked<CopyHelperService>;
	let fileCopyAppendService: DeepMocked<FileCopyAppendService>;

	beforeAll(async () => {
		orm = await setupEntities();
	});

	afterAll(async () => {
		await orm.close();
	});

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				LessonCopyUC,
				{
					provide: UserRepo,
					useValue: createMock<UserRepo>(),
				},
				{
					provide: LessonRepo,
					useValue: createMock<LessonRepo>(),
				},
				{
					provide: CourseRepo,
					useValue: createMock<CourseRepo>(),
				},
				{
					provide: AuthorizationService,
					useValue: createMock<AuthorizationService>(),
				},
				{
					provide: LessonCopyService,
					useValue: createMock<LessonCopyService>(),
				},
				{
					provide: CopyHelperService,
					useValue: createMock<CopyHelperService>(),
				},
				{
					provide: EtherpadService,
					useValue: createMock<EtherpadService>(),
				},
				{
					provide: FileCopyAppendService,
					useValue: createMock<FileCopyAppendService>(),
				},
			],
		}).compile();

		uc = module.get(LessonCopyUC);
		userRepo = module.get(UserRepo);
		lessonRepo = module.get(LessonRepo);
		authorisation = module.get(AuthorizationService);
		courseRepo = module.get(CourseRepo);
		lessonCopyService = module.get(LessonCopyService);
		copyHelperService = module.get(CopyHelperService);
		fileCopyAppendService = module.get(FileCopyAppendService);
		Configuration.set('FEATURE_COPY_SERVICE_ENABLED', true);
	});

	describe('copy lesson', () => {
		const setup = () => {
			const user = userFactory.buildWithId();
			const course = courseFactory.buildWithId({ teachers: [user] });
			const allLessons = lessonFactory.buildList(3, { course });
			const lesson = allLessons[0];

			authorisation.getUserWithPermissions.mockResolvedValue(user);
			lessonRepo.findById.mockResolvedValue(lesson);
			lessonRepo.findAllByCourseIds.mockResolvedValue([allLessons, allLessons.length]);
			lessonRepo.save.mockResolvedValue(undefined);

			courseRepo.findById.mockResolvedValue(course);
			authorisation.hasPermission.mockReturnValue(true);
			const copy = lessonFactory.buildWithId({ course });
			const status = {
				title: 'lessonCopy',
				type: CopyElementType.LESSON,
				status: CopyStatusEnum.SUCCESS,
				copyEntity: copy,
			};
			lessonCopyService.copyLesson.mockResolvedValue(status);
			lessonCopyService.updateCopiedEmbeddedTasks.mockReturnValue(status);
			const lessonCopyName = 'Copy';
			copyHelperService.deriveCopyName.mockReturnValue(lessonCopyName);

			const jwt = 'some-fake-jwt';
			fileCopyAppendService.appendFiles.mockResolvedValue(status);
			fileCopyAppendService.copyEmbeddedFilesOfLessons.mockResolvedValue(status);

			return {
				user,
				course,
				lesson,
				copy,
				status,
				lessonCopyName,
				allLessons,
				jwt,
			};
		};

		it('should throw if copy feature is deactivated', async () => {
			Configuration.set('FEATURE_COPY_SERVICE_ENABLED', false);
			const { course, user, lesson, jwt } = setup();
			await expect(uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt })).rejects.toThrowError(
				InternalServerErrorException
			);
		});

		it('should fetch correct user', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(authorisation.getUserWithPermissions).toBeCalledWith(user.id);
		});

		it('should fetch correct lesson', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(lessonRepo.findById).toBeCalledWith(lesson.id);
		});

		it('should fetch destination course', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(courseRepo.findById).toBeCalledWith(course.id);
		});

		it('should pass without destination course', async () => {
			const { user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { jwt });
			expect(courseRepo.findById).not.toHaveBeenCalled();
		});

		it('should check authorisation for lesson', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(authorisation.hasPermission).toBeCalledWith(user, lesson, {
				action: Actions.read,
				requiredPermissions: [Permission.TOPIC_CREATE],
			});
		});

		it('should check authorisation for destination course', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(authorisation.hasPermission).toBeCalledWith(user, course, {
				action: Actions.write,
				requiredPermissions: [],
			});
		});

		it('should pass authorisation check without destination course', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { jwt });
			expect(authorisation.hasPermission).not.toBeCalledWith(user, course, {
				action: Actions.write,
				requiredPermissions: [],
			});
		});

		it('should call copy service', async () => {
			const { course, user, lesson, lessonCopyName, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(lessonCopyService.copyLesson).toBeCalledWith({
				originalLesson: lesson,
				destinationCourse: course,
				user,
				copyName: lessonCopyName,
			});
		});

		it('should persist copy', async () => {
			const { course, user, lesson, copy, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(lessonRepo.save).toBeCalledWith(copy);
		});

		it('should try to append file copies from original task to task copy', async () => {
			const { course, user, lesson, jwt } = setup();
			const copyStatus = await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(fileCopyAppendService.appendFiles).toBeCalledWith(copyStatus, jwt);
		});

		it('should return status', async () => {
			const { course, user, lesson, status, jwt } = setup();
			const result = await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(result).toEqual(status);
		});

		it('should use copyHelperService', async () => {
			const { course, user, lesson, allLessons, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			const existingNames = allLessons.map((l) => l.name);
			expect(copyHelperService.deriveCopyName).toHaveBeenCalledWith(lesson.name, existingNames);
		});

		it('should use lessonCopyService ', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(lessonCopyService.updateCopiedEmbeddedTasks).toHaveBeenCalled();
		});

		it('should use findAllByCourseIds to determine existing lesson names', async () => {
			const { course, user, lesson, jwt } = setup();
			await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
			expect(lessonRepo.findAllByCourseIds).toHaveBeenCalledWith([course.id]);
		});

		describe('when access to lesson is forbidden', () => {
			const setupWithLessonForbidden = () => {
				const user = userFactory.buildWithId();
				const course = courseFactory.buildWithId();
				const lesson = lessonFactory.buildWithId();
				userRepo.findById.mockResolvedValue(user);
				lessonRepo.findById.mockResolvedValue(lesson);
				authorisation.hasPermission.mockImplementation((u: User, e: PermissionTypes) => e !== lesson);
				const jwt = 'some-fake-jwt';

				return { user, course, lesson, jwt };
			};

			it('should throw NotFoundException', async () => {
				const { course, user, lesson, jwt } = setupWithLessonForbidden();

				try {
					await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
					throw new Error('should have failed');
				} catch (err) {
					expect(err).toBeInstanceOf(ForbiddenException);
				}
			});
		});

		describe('when access to course is forbidden', () => {
			const setupWithCourseForbidden = () => {
				const user = userFactory.buildWithId();
				const course = courseFactory.buildWithId();
				const lesson = lessonFactory.buildWithId();
				userRepo.findById.mockResolvedValue(user);
				lessonRepo.findById.mockResolvedValue(lesson);
				courseRepo.findById.mockResolvedValue(course);
				authorisation.hasPermission.mockImplementation((u: User, e: PermissionTypes) => e !== course);
				const jwt = 'some-fake-jwt';

				return { user, course, lesson, jwt };
			};

			it('should throw Forbidden Exception', async () => {
				const { course, user, lesson, jwt } = setupWithCourseForbidden();

				try {
					await uc.copyLesson(user.id, lesson.id, { courseId: course.id, jwt });
					throw new Error('should have failed');
				} catch (err) {
					expect(err).toBeInstanceOf(ForbiddenException);
				}
			});
		});
	});
});
