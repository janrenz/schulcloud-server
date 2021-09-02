import { Test, TestingModule } from '@nestjs/testing';

import { createCurrentTestUser } from '@src/modules/user/utils';
import { PaginationQuery } from '@shared/controller';
import { IFindOptions, SortOrder } from '@shared/domain';
import { Course } from '@src/entities';
import { CourseRepo } from '@src/repositories';

import { Submission, Task } from '../entity';
import { TaskParentTestEntity, TaskTestHelper } from '../utils/TestHelper';
import { SubmissionRepo, TaskRepo } from '../repo';

import { TaskUC, TaskDashBoardPermission } from './task.uc';

// TODO: coursegroups test completly missing
// TODO: how work this stuff with lessons
// TODO: how work this stuff with ignoredTask

describe('TaskService', () => {
	let service: TaskUC;
	let taskRepo: TaskRepo;
	let submissionRepo: SubmissionRepo;
	let courseRepo: CourseRepo;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TaskUC,
				CourseRepo,
				{
					provide: CourseRepo,
					useValue: {
						findAllByUserId() {
							throw new Error('Please write a mock for LearnroomFacade.findCoursesWithGroupsByUserId.');
						},
					},
				},
				TaskRepo,
				{
					provide: TaskRepo,
					useValue: {
						findAll() {
							throw new Error('Please write a mock for TaskRepo.findAll.');
						},
						findAllCurrent() {
							throw new Error('Please write a mock for TaskRepo.findAllCurrent.');
						},
					},
				},
				SubmissionRepo,
				{
					provide: SubmissionRepo,
					useValue: {
						findAllByTaskIds() {
							throw new Error('Please write a mock for SubmissionRepo.findAllByTaskIds');
						},
						findAllByUserId() {
							throw new Error('Please write a mock for SubmissionRepo.findAllByUserId');
						},
					},
				},
			],
		}).compile();

		service = module.get(TaskUC);
		submissionRepo = module.get(SubmissionRepo);
		taskRepo = module.get(TaskRepo);
		courseRepo = module.get(CourseRepo);
	});

	const setSubmissionRepoMock = {
		findAllByUserId: (data: Submission[] = []) => {
			const spy = jest.spyOn(submissionRepo, 'findAllByUserId').mockImplementation(() => {
				return Promise.resolve([data, data.length]);
			});
			return spy;
		},
		findAllByTaskIds: (data: Submission[] = []) => {
			const spy = jest.spyOn(submissionRepo, 'findAllByTaskIds').mockImplementation(() => {
				return Promise.resolve([data, data.length]);
			});
			return spy;
		},
	};

	const setTaskRepoMock = {
		findAllCurrent: (data: Task[] = []) => {
			const spy = jest.spyOn(taskRepo, 'findAllCurrent').mockImplementation(() => {
				return Promise.resolve([data, data.length]);
			});
			return spy;
		},
		findAll: (data: Task[] = []) => {
			const spy = jest.spyOn(taskRepo, 'findAll').mockImplementation(() => {
				return Promise.resolve([data, data.length]);
			});
			return spy;
		},
	};

	const setParentRepoMock = {
		findAllByUserId: (data: TaskParentTestEntity[] = []) => {
			const spy = jest.spyOn(courseRepo, 'findAllByUserId').mockImplementation(() => {
				const mapped = data as unknown[];
				return Promise.resolve([mapped as Course[], mapped.length]);
			});
			return spy;
		},
	};

	const setTaskUCMock = {
		findAllForTeacher: () => {
			const spy = jest.spyOn(service, 'findAllForTeacher').mockImplementation(() => {
				return Promise.resolve([[], 0]);
			});
			return spy;
		},
		findAllForStudent: () => {
			const spy = jest.spyOn(service, 'findAllForStudent').mockImplementation(() => {
				return Promise.resolve([[], 0]);
			});
			return spy;
		},
	};

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		const findAllMock = () => {
			const spy1 = setTaskUCMock.findAllForStudent();

			const mockRestore = () => {
				spy1.mockRestore();
			};

			return mockRestore;
		};

		it('should throw if no permission exist', async () => {
			const permissions = [];
			const { currentUser } = createCurrentTestUser(permissions);

			const mockRestore = findAllMock();

			const paginationQuery = new PaginationQuery();
			const action = async () => service.findAll(currentUser, paginationQuery);
			await expect(action()).rejects.toThrow();

			mockRestore();
		});

		it(`should pass if ${TaskDashBoardPermission.studentDashboard} flag exist and call findAllForStudent.`, async () => {
			const permissions = [TaskDashBoardPermission.studentDashboard];
			const { currentUser } = createCurrentTestUser(permissions);

			const mockRestore = findAllMock();
			const spy = setTaskUCMock.findAllForStudent();

			const paginationQuery = new PaginationQuery();
			const result = await service.findAll(currentUser, paginationQuery);

			expect(result).toEqual([[], 0]);
			expect(spy).toBeCalledTimes(1);

			spy.mockRestore();
			mockRestore();
		});

		it(`should throw by ${TaskDashBoardPermission.teacherDashboard} perission flag.`, async () => {
			const permissions = [TaskDashBoardPermission.teacherDashboard];
			const { currentUser } = createCurrentTestUser(permissions);

			const mockRestore = findAllMock();

			const paginationQuery = new PaginationQuery();
			const action = async () => service.findAll(currentUser, paginationQuery);
			await expect(action()).rejects.toThrow();

			mockRestore();
		});
	});

	describe('findAllForStudent', () => {
		const findAllForStudentMocks = (parents: TaskParentTestEntity[], tasks: Task[], submissions: Submission[] = []) => {
			const spy1 = setParentRepoMock.findAllByUserId(parents);
			const spy2 = setSubmissionRepoMock.findAllByUserId(submissions);
			const spy3 = setTaskRepoMock.findAllCurrent(tasks);

			const mockRestore = () => {
				spy1.mockRestore();
				spy2.mockRestore();
				spy3.mockRestore();
			};
			return mockRestore;
		};

		it('should return pagination promise', async () => {
			const helper = new TaskTestHelper();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [result, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(Array.isArray(result)).toBeTruthy();
			expect(count).toEqual(0);

			mockRestore();
		});

		it('should find a open task', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);

			const tasks = [task1];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(1);

			mockRestore();
		});

		it('should return well formed task with parent and status', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);

			const tasks = [task1];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [result] = await service.findAllForStudent(user.id, paginationQuery);

			expect(result[0]).toEqual({ task: task1, status: { submitted: 0, maxSubmissions: 1, graded: 0 } });
			expect(result[0].task.getParent()).toBeDefined();

			mockRestore();
		});

		it('should work for parent without tasks', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();

			const tasks = [];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(0);

			mockRestore();
		});

		it('should find a list of open task', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent1.id);
			const task3 = helper.createTask(parent1.id);

			const tasks = [task1, task2, task3];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(3);

			mockRestore();
		});

		it('should find open task from different parents', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const parent2 = helper.createTaskParent();
			const parent3 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent2.id);
			const task3 = helper.createTask(parent3.id);

			const tasks = [task1, task2, task3];
			const parents = [parent1, parent2, parent3];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(3);

			mockRestore();
		});

		it('should work if no parent is matched', async () => {
			const helper = new TaskTestHelper();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(0);

			mockRestore();
		});

		it('should pass pagination and order', async () => {
			const helper = new TaskTestHelper();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForStudentMocks(parents, tasks);
			const spy = setTaskRepoMock.findAllCurrent([]);

			const skip = 0;
			const limit = 10;

			const expectedOptions: IFindOptions<Task> = {
				pagination: { skip: 0, limit: 10 },
				order: { dueDate: SortOrder.asc },
			};

			const user = helper.getFirstUser();
			await service.findAllForStudent(user.id, { skip, limit });

			expect(spy).toHaveBeenCalledWith([], expectedOptions);

			mockRestore();
			spy.mockRestore();
		});

		it('should compute status for task', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const submission1 = helper.createSubmission(task1);

			const tasks = [task1];
			const parents = [parent1];
			const submissions = [submission1];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [result] = await service.findAllForStudent(user.id, paginationQuery);

			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			mockRestore();
		});

		it('should compute status for multiple tasks', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const parent2 = helper.createTaskParent();
			const parent3 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent1.id);
			const task3 = helper.createTask(parent2.id);
			// parent 3 has no task
			const submission1 = helper.createSubmission(task1);
			// task2 has no submission
			const submission3 = helper.createSubmission(task3);

			const tasks = [task1, task2, task3];
			const parents = [parent1, parent2, parent3];
			const submissions = [submission1, submission3];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [result] = await service.findAllForStudent(user.id, paginationQuery);

			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			expect(result[1].status).toEqual({
				graded: 0,
				submitted: 0,
				maxSubmissions: 1,
			});

			expect(result[2].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			mockRestore();
		});

		it('should compute status for multiple tasks', async () => {
			const helper = new TaskTestHelper();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);

			const submission1 = helper.createSubmission(task1);
			const submission2 = helper.createSubmission(task1);
			const submission3 = helper.createSubmission(task1);

			const tasks = [task1];
			const parents = [parent1];
			const submissions = [submission1, submission2, submission3];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [result, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(1);
			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			mockRestore();
		});

		/**
		 * This is a passive test if after call to parent no parentId can pass for the next step.
		 */
		it('should only pass parents where the user has no write permissions', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id); // with write permissions

			const tasks = [];
			const parents = [parent1];
			const submissions = [];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);
			const spy = setTaskRepoMock.findAllCurrent();

			const paginationQuery = new PaginationQuery();
			await service.findAllForStudent(user.id, paginationQuery);

			const expectedOptions: IFindOptions<Task> = {
				pagination: { skip: 0, limit: 10 },
				order: { dueDate: SortOrder.asc },
			};
			const noParents = [];
			expect(spy).toHaveBeenCalledWith(noParents, expectedOptions);

			mockRestore();
		});
	});

	describe('findAllForTeacher', () => {
		const findAllForTeacherMocks = (parents: TaskParentTestEntity[], tasks: Task[], submissions: Submission[] = []) => {
			const spy1 = setParentRepoMock.findAllByUserId(parents);
			const spy2 = setSubmissionRepoMock.findAllByTaskIds(submissions);
			const spy3 = setTaskRepoMock.findAll(tasks);

			const mockRestore = () => {
				spy1.mockRestore();
				spy2.mockRestore();
				spy3.mockRestore();
			};
			return mockRestore;
		};

		it('should return pagination promise', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const tasks = [];
			const parents = [];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [result, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(Array.isArray(result)).toBeTruthy();
			expect(count).toEqual(0);

			mockRestore();
		});

		it('should find a open task', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);

			const tasks = [task1];
			const parents = [parent1];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(count).toEqual(1);

			mockRestore();
		});

		it('should return well formed task with parent and status', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);

			const tasks = [task1];
			const parents = [parent1];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();

			const [result] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(result[0]).toEqual({ task: task1, status: { submitted: 0, maxSubmissions: 10, graded: 0 } });
			expect(result[0].task.getParent()).toBeDefined();

			mockRestore();
		});

		it('should work for parent without tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);

			const tasks = [];
			const parents = [parent1];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(count).toEqual(0);

			mockRestore();
		});

		it('should find a list of open task', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent1.id);
			const task3 = helper.createTask(parent1.id);

			const tasks = [task1, task2, task3];
			const parents = [parent1];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(count).toEqual(3);

			mockRestore();
		});

		it('should find open task from different parents', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const parent2 = helper.createTaskParent(user.id);
			const parent3 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent2.id);
			const task3 = helper.createTask(parent3.id);

			const tasks = [task1, task2, task3];
			const parents = [parent1, parent2, parent3];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(count).toEqual(3);

			mockRestore();
		});

		it('should work if no parent is matched', async () => {
			const helper = new TaskTestHelper();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForTeacherMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const user = helper.getFirstUser();
			const [, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(count).toEqual(0);

			mockRestore();
		});

		it('should pass pagination and order', async () => {
			const helper = new TaskTestHelper();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForTeacherMocks(parents, tasks);
			const spy = setTaskRepoMock.findAll([]);

			const skip = 0;
			const limit = 10;

			const expectedOptions: IFindOptions<Task> = {
				pagination: { skip: 0, limit: 10 },
				order: { createdAt: SortOrder.desc },
			};

			const user = helper.getFirstUser();
			await service.findAllForTeacher(user.id, { skip, limit });

			expect(spy).toHaveBeenCalledWith([], expectedOptions);

			mockRestore();
			spy.mockRestore();
		});

		it('should compute status for task', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);
			const submission1 = helper.createSubmission(task1);

			const tasks = [task1];
			const parents = [parent1];
			const submissions = [submission1];

			const mockRestore = findAllForTeacherMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const [result] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 10,
			});

			mockRestore();
		});

		it('should compute status for multiple tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const parent2 = helper.createTaskParent(user.id);
			const parent3 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent1.id);
			const task3 = helper.createTask(parent2.id);
			// parent 3 has no task
			const submission1 = helper.createSubmission(task1);
			// task2 has no submission
			const submission3 = helper.createSubmission(task3);

			const tasks = [task1, task2, task3];
			const parents = [parent1, parent2, parent3];
			const submissions = [submission1, submission3];

			const mockRestore = findAllForTeacherMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const [result] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 10,
			});

			expect(result[1].status).toEqual({
				graded: 0,
				submitted: 0,
				maxSubmissions: 10,
			});

			expect(result[2].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 10,
			});

			mockRestore();
		});

		it('should compute status for multiple tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id);
			const task1 = helper.createTask(parent1.id);

			const submission1 = helper.createSubmission(task1);
			const submission2 = helper.createSubmission(task1);
			const submission3 = helper.createSubmission(task1);

			const tasks = [task1];
			const parents = [parent1];
			const submissions = [submission1, submission2, submission3];

			const mockRestore = findAllForTeacherMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const [result, count] = await service.findAllForTeacher(user.id, paginationQuery);

			expect(count).toEqual(1);
			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 10,
			});

			mockRestore();
		});

		/**
		 * This is a passive test if after call to parent no parentId can pass for the next step.
		 */
		it('should only pass parents where the user has write permissions', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(); // no write permissions

			const tasks = [];
			const parents = [parent1];
			const submissions = [];

			const mockRestore = findAllForTeacherMocks(parents, tasks, submissions);
			const spy = setTaskRepoMock.findAll();

			const paginationQuery = new PaginationQuery();
			await service.findAllForTeacher(user.id, paginationQuery);

			const expectedOptions: IFindOptions<Task> = {
				pagination: { skip: 0, limit: 10 },
				order: { createdAt: SortOrder.desc },
			};
			const noParents = [];
			expect(spy).toHaveBeenCalledWith(noParents, expectedOptions);

			mockRestore();
		});
	});

	describe('findAllForStudent', () => {
		const findAllForStudentMocks = (parents: TaskParentTestEntity[], tasks: Task[], submissions: Submission[] = []) => {
			const spy1 = setParentRepoMock.findAllByUserId(parents);
			const spy2 = setSubmissionRepoMock.findAllByUserId(submissions);
			const spy3 = setTaskRepoMock.findAllCurrent(tasks);

			const mockRestore = () => {
				spy1.mockRestore();
				spy2.mockRestore();
				spy3.mockRestore();
			};
			return mockRestore;
		};

		// TODO: coursegroups test completly missing
		// TODO: how work this stuff with lessons
		// TODO: how work this stuff with ignoredTask

		it('should return pagination promise', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [result, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(Array.isArray(result)).toBeTruthy();
			expect(count).toEqual(0);

			mockRestore();
		});

		it('should find a list of tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent1.id);
			const task3 = helper.createTask(parent1.id);

			const tasks = [task1, task2, task3];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(3);

			mockRestore();
		});

		it('should return well formed tasks with parent and status', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);

			const tasks = [task1];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [result] = await service.findAllForStudent(user.id, paginationQuery);

			expect(result[0]).toEqual({ task: task1, status: { submitted: 0, maxSubmissions: 1, graded: 0 } });
			expect(result[0].task.getParent()).toBeDefined();

			mockRestore();
		});

		it('should work for parents without tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent();

			const tasks = [];
			const parents = [parent1];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(0);

			mockRestore();
		});

		it('should find tasks from different parents', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent();
			const parent2 = helper.createTaskParent();
			const parent3 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent2.id);
			const task3 = helper.createTask(parent3.id);

			const tasks = [task1, task2, task3];
			const parents = [parent1, parent2, parent3];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(3);

			mockRestore();
		});

		it('should work if no parent is matched', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForStudentMocks(parents, tasks);

			const paginationQuery = new PaginationQuery();
			const [, count] = await service.findAllForStudent(user.id, paginationQuery);

			expect(count).toEqual(0);

			mockRestore();
		});

		it('should pass pagination and order', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();

			const tasks = [];
			const parents = [];

			const mockRestore = findAllForStudentMocks(parents, tasks);
			const spy = setTaskRepoMock.findAllCurrent([]);

			const skip = 0;
			const limit = 10;

			const expectedOptions: IFindOptions<Task> = {
				pagination: { skip: 0, limit: 10 },
				order: { dueDate: SortOrder.asc },
			};

			await service.findAllForStudent(user.id, { skip, limit });

			expect(spy).toHaveBeenCalledWith([], expectedOptions);

			mockRestore();
			spy.mockRestore();
		});

		it('should compute status for tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const submission1 = helper.createSubmission(task1);

			const tasks = [task1];
			const parents = [parent1];
			const submissions = [submission1];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const [result] = await service.findAllForStudent(user.id, paginationQuery);

			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			mockRestore();
		});

		it('should compute status for tasks', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent();
			const parent2 = helper.createTaskParent();
			const parent3 = helper.createTaskParent();
			const task1 = helper.createTask(parent1.id);
			const task2 = helper.createTask(parent1.id);
			const task3 = helper.createTask(parent2.id);
			// parent 3 has no task
			const submission1 = helper.createSubmission(task1);
			// task2 has no submission
			const submission3 = helper.createSubmission(task3);

			const tasks = [task1, task2, task3];
			const parents = [parent1, parent2, parent3];
			const submissions = [submission1, submission3];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);

			const paginationQuery = new PaginationQuery();
			const [result] = await service.findAllForStudent(user.id, paginationQuery);

			expect(result[0].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			expect(result[1].status).toEqual({
				graded: 0,
				submitted: 0,
				maxSubmissions: 1,
			});

			expect(result[2].status).toEqual({
				graded: 0,
				submitted: 1,
				maxSubmissions: 1,
			});

			mockRestore();
		});

		/**
		 * This is a passive test if after call to parent no parentId can pass for the next step.
		 */
		it('should only pass parents where the user has no write permissions', async () => {
			const helper = new TaskTestHelper();
			const user = helper.getFirstUser();
			const parent1 = helper.createTaskParent(user.id); // write permissions

			const tasks = [];
			const parents = [parent1];
			const submissions = [];

			const mockRestore = findAllForStudentMocks(parents, tasks, submissions);
			const spy = setTaskRepoMock.findAllCurrent();

			const paginationQuery = new PaginationQuery();
			await service.findAllForStudent(user.id, paginationQuery);

			const expectedOptions: IFindOptions<Task> = {
				pagination: { skip: 0, limit: 10 },
				order: { dueDate: SortOrder.asc },
			};
			const noParents = [];
			expect(spy).toHaveBeenCalledWith(noParents, expectedOptions);

			mockRestore();
		});
	});
});
