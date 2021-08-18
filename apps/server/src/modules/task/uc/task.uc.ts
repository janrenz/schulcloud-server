/* istanbul ignore file */
// TODO add tests to improve coverage

import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { LearnroomFacade } from '@modules/learnroom';
import { EntityId, IPagination, Counted, ICurrentUser } from '@shared/domain';

import { LearnroomFacade } from '../../learnroom';

import { TaskRepo, SubmissionRepo } from '../repo';
import { EntityArray } from '../utils';
import { TaskDomainService, TaskWithSubmissionStatus } from '../domain';

// define interface for task and submission repo

@Injectable()
export class TaskUC {
	// It should remove later
	permissions = {
		teacherDashboard: 'TASK_DASHBOARD_TEACHER_VIEW_V3',
		studentDashboard: 'TASK_DASHBOARD_VIEW_V3',
	};

	// TODO: IMPORTANT steps for this PULL REQUEST
	// delete all learnroom stuff, move repo of course and coursegroups to a new top level repo layer
	// do the same for course and coursgroup entity
	// delete coursegroup info entity and replace it with final entity
	// remove coursegroup entity from repo and pass it from uc
	constructor(
		private readonly taskRepo: TaskRepo,
		private readonly submissionRepo: SubmissionRepo,
		private readonly learnroomFacade: LearnroomFacade
	) {}

	async findAllOpenForStudent(userId: EntityId, pagination: IPagination): Promise<Counted<TaskWithSubmissionStatus[]>> {
		// Important the facade stategue is only a temporary solution until we established a better way for resolving the dependency graph
		const [coursesWithGroups] = await this.learnroomFacade.findCoursesWithGroupsByUserId(userId);
		const courses = new EntityArray(coursesWithGroups);

		const [submissionsOfStudent] = await this.submissionRepo.getAllSubmissionsByUser(userId);
		const taskIdsThatHaveSubmissions = submissionsOfStudent.map((submission) => submission.task.id);

		const [tasks, total] = await this.taskRepo.findAllByStudent(
			courses.getIds(),
			pagination,
			taskIdsThatHaveSubmissions
		);

		const domain = new TaskDomainService(courses, tasks);
		domain.addParentToTasks();
		// after add status to task it is not nessasray to return it directly
		// we can do the step and in the end use prepareTasks.getResult();
		const computedTasks = domain.computeStatusForStudents(submissionsOfStudent);

		return [computedTasks, total];
	}

	async findAllOpenByTeacher(userId: EntityId, pagination: IPagination): Promise<Counted<TaskWithSubmissionStatus[]>> {
		// Important the facade stategue is only a temporary solution until we established a better way for resolving the dependency graph
		const [coursesWithGroups] = await this.learnroomFacade.findCoursesWithGroupsByUserId(userId);

		// Add Authorization service or logic until it is avaible for learnroom
		const courseWithGroupsWithWritePermissions = coursesWithGroups.filter((course) =>
			course.hasWritePermission(userId)
		);
		const courses = new EntityArray(courseWithGroupsWithWritePermissions);

		const [tasks, total] = await this.taskRepo.findAllAssignedByTeacher(courses.getIds(), pagination);
		const [submissionsOfTeacher] = await this.submissionRepo.getSubmissionsByTasksList(tasks);

		const domain = new TaskDomainService(courses, tasks);
		domain.addParentToTasks();
		// after add status to task it is not nessasray to return it directly
		// we can do the step and in the end use prepareTasks.getResult();
		const computedTasks = domain.computeStatusForTeachers(submissionsOfTeacher);

		return [computedTasks, total];
	}

	// should remove in future, permissions are not needed
	// maybe add different endpoints and if student ask teacher endpoint they get nothing
	async findAllOpen(currentUser: ICurrentUser, pagination: IPagination): Promise<Counted<TaskWithSubmissionStatus[]>> {
		const {
			user: { id, permissions },
		} = currentUser;

		let response: Counted<TaskWithSubmissionStatus[]>;
		if (permissions.includes(this.permissions.teacherDashboard)) {
			response = await this.findAllOpenByTeacher(id, pagination);
		} else if (permissions.includes(this.permissions.studentDashboard)) {
			response = await this.findAllOpenForStudent(id, pagination);
		} else {
			throw new UnauthorizedException();
		}

		return response;
	}
}
