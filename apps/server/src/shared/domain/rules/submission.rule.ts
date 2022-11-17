import { Injectable } from '@nestjs/common';
import { Submission, User } from '../entity';
import { IAuthorizationContext, AuthorizableObjectType } from '../interface/rule';
import { Actions } from './actions.enum';
import { BaseRule } from './base-rule';
import { CourseGroupRule } from './course-group.rule';
import { TaskRule } from './task.rule';

@Injectable()
export class SubmissionRule extends BaseRule<Submission> {
	constructor(private readonly taskRule: TaskRule, private readonly courseGroupRule: CourseGroupRule) {
		super();
	}

	public isApplicable(user: User, object: AuthorizableObjectType): boolean {
		const isMatched = object instanceof Submission;

		return isMatched;
	}

	public hasPermission(user: User, submission: Submission, context: IAuthorizationContext): boolean {
		const { action, requiredPermissions } = context;

		const result =
			this.utils.hasAllPermissions(user, requiredPermissions) && this.hasAccessToSubmission(user, submission, action);

		return result;
	}

	private hasAccessToSubmission(user: User, submission: Submission, action: Actions): boolean {
		let hasAccessToSubmission = false;

		if (action === Actions.write) {
			hasAccessToSubmission = this.hasWriteAccess(user, submission);
		} else if (action === Actions.read) {
			hasAccessToSubmission = this.hasReadAccess(user, submission);
		}

		return hasAccessToSubmission;
	}

	private hasWriteAccess(user: User, submission: Submission) {
		const hasWriteAccess =
			this.isCreator(user, submission) ||
			this.isTeamMember(user, submission) ||
			this.isInCourseGroup(user, submission) ||
			this.hasParentTaskWriteAccess(user, submission);

		return hasWriteAccess;
	}

	private hasReadAccess(user: User, submission: Submission) {
		const hasReadAccess =
			this.hasWriteAccess(user, submission) ||
			(this.hasParentTaskReadAccess(user, submission) && submission.task.areSubmissionsPublic());

		return hasReadAccess;
	}

	private isCreator(user: User, submission: Submission) {
		const isCreator = this.utils.hasAccessToEntity(user, submission, ['student']);

		return isCreator;
	}

	private isTeamMember(user: User, submission: Submission) {
		const isTeamMember = this.utils.hasAccessToEntity(user, submission, ['teamMembers']);

		return isTeamMember;
	}

	private isInCourseGroup(user: User, submission: Submission) {
		const isInCourseGroup =
			submission.courseGroup &&
			this.courseGroupRule.hasPermission(user, submission.courseGroup, {
				action: Actions.read,
				requiredPermissions: [],
			});

		return isInCourseGroup;
	}

	private hasParentTaskWriteAccess(user: User, submission: Submission) {
		const hasParentTaskWriteAccess = this.taskRule.hasPermission(user, submission.task, {
			action: Actions.write,
			requiredPermissions: [],
		});

		return hasParentTaskWriteAccess;
	}

	private hasParentTaskReadAccess(user: User, submission: Submission) {
		const hasParentTaskReadAccess = this.taskRule.hasPermission(user, submission.task, {
			action: Actions.read,
			requiredPermissions: [],
		});

		return hasParentTaskReadAccess;
	}
}
