import { Account } from './account.entity';
import { Board } from './board.entity';
import { BoardElement, LessonBoardElement, TaskBoardElement } from './boardelement.entity';
import { Course } from './course.entity';
import { CourseGroup } from './coursegroup.entity';
import { DashboardGridElementModel, DashboardModelEntity } from './dashboard.model.entity';
import { File } from './file.entity';
import { FileRecord, FileSecurityCheck } from './filerecord.entity';
import { ImportUser } from './import-user.entity';
import { Lesson } from './lesson.entity';
import { CourseNews, News, SchoolNews, TeamNews } from './news.entity';
import { Role } from './role.entity';
import { School, SchoolRolePermission, SchoolRoles } from './school.entity';
import { StorageProvider } from './storageprovider.entity';
import { Submission } from './submission.entity';
import { System } from './system.entity';
import { Task } from './task.entity';
import { Team } from './team.entity';
import { User } from './user.entity';

export const ALL_ENTITIES = [
	Account,
	Course,
	CourseGroup,
	Board,
	BoardElement,
	TaskBoardElement,
	LessonBoardElement,
	DashboardModelEntity,
	DashboardGridElementModel,
	File,
	StorageProvider,
	Lesson,
	Role,
	School,
	SchoolRoles,
	SchoolRolePermission,
	Submission,
	Task,
	Team,
	User,
	CourseNews,
	News,
	SchoolNews,
	TeamNews,
	System,
	ImportUser,
	FileRecord,
	FileSecurityCheck,
];
