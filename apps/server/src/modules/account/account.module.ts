import { Module } from '@nestjs/common';
import { PermissionService } from '@shared/domain';
import { SystemRepo, UserRepo } from '@shared/repo';
import { IdentityManagementModule } from '@shared/infra/identity-management';
import { AccountController } from './controller/account.controller';
import { AccountRepo } from './repo/account.repo';
import { AccountService } from './services/account.service';
import { AccountValidationService } from './services/account.validation.service';
import { AccountUc } from './uc/account.uc';
import { LoggerModule } from '../../core/logger/logger.module';
import { AccountServiceDb } from './services/account-db.service';
import { AccountServiceIdm } from './services/account-idm.service';

@Module({
	imports: [IdentityManagementModule, LoggerModule],
	providers: [
		UserRepo,
		SystemRepo,
		PermissionService,
		AccountRepo,
		AccountServiceDb,
		AccountServiceIdm,
		AccountService,
		AccountValidationService,
		AccountUc,
	],
	controllers: [AccountController],
	exports: [AccountUc, AccountService, AccountValidationService],
})
export class AccountModule {}
