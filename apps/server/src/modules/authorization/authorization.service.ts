import { ForbiddenException, Injectable } from '@nestjs/common';
import {
	BasePermissionManager,
	CourseGroupRule,
	CourseRule,
	EntityId,
	LessonRule,
	SchoolExternalToolRule,
	SchoolRule,
	SubmissionRule,
	TaskCardRule,
	TaskRule,
	User,
	UserRule,
} from '@shared/domain';
import { IPermissionContext, PermissionTypes } from '@shared/domain/interface';
import { TeamRule } from '@shared/domain/rules/team.rule';
import { ForbiddenLoggableException } from './errors/forbidden.loggable-exception';
import { AllowedAuthorizationEntityType } from './interfaces';
import { ReferenceLoader } from './reference.loader';

@Injectable()
export class AuthorizationService extends BasePermissionManager {
	constructor(
		private readonly courseRule: CourseRule,
		private readonly courseGroupRule: CourseGroupRule,
		private readonly lessonRule: LessonRule,
		private readonly schoolRule: SchoolRule,
		private readonly taskRule: TaskRule,
		private readonly taskCardRule: TaskCardRule,
		private readonly userRule: UserRule,
		private readonly teamRule: TeamRule,
		private readonly submissionRule: SubmissionRule,
		private readonly loader: ReferenceLoader,
		private readonly schoolExternalToolRule: SchoolExternalToolRule
	) {
		super();
		this.registerPermissions([
			this.courseRule,
			this.courseGroupRule,
			this.lessonRule,
			this.taskRule,
			this.taskCardRule,
			this.teamRule,
			this.userRule,
			this.schoolRule,
			this.submissionRule,
			this.schoolExternalToolRule,
		]);
	}

	checkPermission(user: User, entity: PermissionTypes, context: IPermissionContext) {
		if (!this.hasPermission(user, entity, context)) {
			throw new ForbiddenLoggableException(user.id, context);
		}
	}

	async hasPermissionByReferences(
		userId: EntityId,
		entityName: AllowedAuthorizationEntityType,
		entityId: EntityId,
		context: IPermissionContext
	): Promise<boolean> {
		// TODO: This try-catch is unnecessary and wrong because NotFound is the correct response if the entity cannot be loaded.
		try {
			const [user, entity] = await Promise.all([
				this.getUserWithPermissions(userId),
				this.loader.loadEntity(entityName, entityId),
			]);
			const permission = this.hasPermission(user, entity, context);

			return permission;
		} catch (err) {
			throw new ForbiddenException(err);
		}
	}

	async checkPermissionByReferences(
		userId: EntityId,
		entityName: AllowedAuthorizationEntityType,
		entityId: EntityId,
		context: IPermissionContext
	) {
		if (!(await this.hasPermissionByReferences(userId, entityName, entityId, context))) {
			throw new ForbiddenLoggableException(userId, context);
		}
	}

	async getUserWithPermissions(userId: EntityId): Promise<User> {
		const userWithPermissions = await this.loader.getUserWithPermissions(userId);

		return userWithPermissions;
	}
}
