import { Test, TestingModule } from '@nestjs/testing';
import { LearnroomFacade } from '../../learnroom';
import { TaskRepo, SubmissionRepo } from '../repo';
import { TaskUC } from '../uc';
import { TaskController } from './task.controller';

describe('TaskController', () => {
	let controller: TaskController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TaskUC,
				LearnroomFacade,
				{
					provide: LearnroomFacade,
					useValue: {},
				},
				TaskRepo,
				{
					provide: TaskRepo,
					useValue: {},
				},
				SubmissionRepo,
				{
					provide: SubmissionRepo,
					useValue: {},
				},
			],
			controllers: [TaskController],
		}).compile();

		controller = module.get<TaskController>(TaskController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
