import { Module } from '@nestjs/common';
import { PseudonymsRepo } from '@shared/repo';
import { LoggerModule } from '@src/core/logger';
import { ExternalToolRepoMapper } from '@shared/repo/externaltool/external-tool.repo.mapper';
import { ExternalToolRepo } from '@shared/repo/externaltool/external-tool.repo';
import { SchoolExternalToolRepo } from '@shared/repo/schoolexternaltool/school-external-tool.repo';
import { CourseExternalToolRepo } from '@shared/repo/courseexternaltool/course-external-tool.repo';
import { OauthProviderServiceModule } from '@shared/infra/oauth-provider';
import { EncryptionModule } from '@shared/infra/encryption';
import { ExternalToolSortingMapper } from '@shared/repo/externaltool/external-tool-sorting.mapper';
import { Lti11Service } from './service/lti11.service';
import { ExternalToolService } from './service/external-tool.service';
import { ExternalToolServiceMapper } from './service/mapper';

@Module({
	imports: [LoggerModule, OauthProviderServiceModule, EncryptionModule],
	providers: [
		Lti11Service,
		ExternalToolService,
		ExternalToolServiceMapper,
		PseudonymsRepo,
		ExternalToolRepo,
		ExternalToolRepoMapper,
		ExternalToolSortingMapper,
		SchoolExternalToolRepo,
		CourseExternalToolRepo,
	],
	exports: [Lti11Service, ExternalToolService],
})
export class ToolModule {}
