import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
	ExternalToolConfigDO,
	ExternalToolDO,
	Lti11ToolConfigDO,
	Oauth2ToolConfigDO,
} from '@shared/domain/domainobject/external-tool';
import { ExternalToolRepo } from '@shared/repo/externaltool/external-tool.repo';
import { EntityId, IFindOptions } from '@shared/domain';
import { SchoolExternalToolRepo } from '@shared/repo/schoolexternaltool/school-external-tool.repo';
import { CourseExternalToolRepo } from '@shared/repo/courseexternaltool/course-external-tool.repo';
import { SchoolExternalToolDO } from '@shared/domain/domainobject/external-tool/school-external-tool.do';
import { Page } from '@shared/domain/interface/page';
import { ProviderOauthClient } from '@shared/infra/oauth-provider/dto';
import { DefaultEncryptionService, IEncryptionService } from '@shared/infra/encryption';
import { OauthProviderService } from '@shared/infra/oauth-provider';
import { Logger } from '@src/core/logger';
import { TokenEndpointAuthMethod, ToolConfigType } from '../interface';
import { ExternalToolServiceMapper } from './mapper';

@Injectable()
export class ExternalToolService {
	constructor(
		private readonly externalToolRepo: ExternalToolRepo,
		private readonly oauthProviderService: OauthProviderService,
		private readonly mapper: ExternalToolServiceMapper,
		private readonly schoolExternalToolRepo: SchoolExternalToolRepo,
		private readonly courseExternalToolRepo: CourseExternalToolRepo,
		@Inject(DefaultEncryptionService) private readonly encryptionService: IEncryptionService,
		private readonly logger: Logger
	) {}

	async createExternalTool(externalToolDO: ExternalToolDO): Promise<ExternalToolDO> {
		if (this.isLti11Config(externalToolDO.config)) {
			externalToolDO.config.secret = this.encryptionService.encrypt(externalToolDO.config.secret);
		} else if (this.isOauth2Config(externalToolDO.config)) {
			const oauthClient: ProviderOauthClient = this.mapper.mapDoToProviderOauthClient(
				externalToolDO.name,
				externalToolDO.config
			);

			await this.oauthProviderService.createOAuth2Client(oauthClient);
		}

		const created: ExternalToolDO = await this.externalToolRepo.save(externalToolDO);
		return created;
	}

	async updateExternalTool(toUpdate: ExternalToolDO): Promise<ExternalToolDO> {
		await this.updateOauth2ToolConfig(toUpdate);
		toUpdate.version += 1;
		const externalTool: ExternalToolDO = await this.externalToolRepo.save(toUpdate);
		return externalTool;
	}

	private async updateOauth2ToolConfig(toUpdate: ExternalToolDO) {
		if (this.isOauth2Config(toUpdate.config)) {
			const toUpdateOauthClient: ProviderOauthClient = this.mapper.mapDoToProviderOauthClient(
				toUpdate.name,
				toUpdate.config
			);
			const loadedOauthClient: ProviderOauthClient = await this.oauthProviderService.getOAuth2Client(
				toUpdate.config.clientId
			);
			await this.updateOauthClientOrThrow(loadedOauthClient, toUpdateOauthClient, toUpdate);
		}
	}

	private async updateOauthClientOrThrow(
		loadedOauthClient: ProviderOauthClient,
		toUpdateOauthClient: ProviderOauthClient,
		toUpdate: ExternalToolDO
	) {
		if (loadedOauthClient && loadedOauthClient.client_id) {
			await this.oauthProviderService.updateOAuth2Client(loadedOauthClient.client_id, toUpdateOauthClient);
		} else {
			throw new UnprocessableEntityException(`The oAuthConfigs clientId of tool ${toUpdate.name}" does not exist`);
		}
	}

	async findExternalTools(
		query: Partial<ExternalToolDO>,
		options: IFindOptions<ExternalToolDO>
	): Promise<Page<ExternalToolDO>> {
		const tools: Page<ExternalToolDO> = await this.externalToolRepo.find(query, options);

		const resolvedTools: (ExternalToolDO | undefined)[] = await Promise.all(
			tools.data.map(async (tool: ExternalToolDO): Promise<ExternalToolDO | undefined> => {
				if (this.isOauth2Config(tool.config)) {
					try {
						await this.addExternalOauth2DataToConfig(tool.config);
					} catch (e) {
						this.logger.debug(
							`Could not resolve oauth2Config of tool with clientId ${tool.config.clientId}. It will be filtered out.`
						);
						return undefined;
					}
				}
				return tool;
			})
		);

		tools.data = resolvedTools.filter((tool) => tool !== undefined) as ExternalToolDO[];

		return tools;
	}

	async findExternalToolById(id: EntityId): Promise<ExternalToolDO> {
		const tool: ExternalToolDO = await this.externalToolRepo.findById(id);
		if (this.isOauth2Config(tool.config)) {
			try {
				await this.addExternalOauth2DataToConfig(tool.config);
			} catch (e) {
				this.logger.debug(
					`Could not resolve oauth2Config of tool with clientId ${tool.config.clientId}. It will be filtered out.`
				);
				throw new UnprocessableEntityException(`Could not resolve oauth2Config of tool ${tool.name}.`);
			}
		}
		return tool;
	}

	findExternalToolByName(name: string): Promise<ExternalToolDO | null> {
		const externalTool: Promise<ExternalToolDO | null> = this.externalToolRepo.findByName(name);
		return externalTool;
	}

	findExternalToolByOAuth2ConfigClientId(clientId: string): Promise<ExternalToolDO | null> {
		const externalTool: Promise<ExternalToolDO | null> = this.externalToolRepo.findByOAuth2ConfigClientId(clientId);
		return externalTool;
	}

	private async addExternalOauth2DataToConfig(config: Oauth2ToolConfigDO) {
		const oauthClient: ProviderOauthClient = await this.oauthProviderService.getOAuth2Client(config.clientId);

		config.scope = oauthClient.scope;
		config.tokenEndpointAuthMethod = oauthClient.token_endpoint_auth_method as TokenEndpointAuthMethod;
		config.redirectUris = oauthClient.redirect_uris;
		config.frontchannelLogoutUri = oauthClient.frontchannel_logout_uri;
	}

	async deleteExternalTool(toolId: EntityId): Promise<void> {
		const schoolExternalTools: SchoolExternalToolDO[] = await this.schoolExternalToolRepo.findByToolId(toolId);
		const schoolExternalToolIds: string[] = schoolExternalTools.map(
			(schoolExternalTool: SchoolExternalToolDO): string => {
				// We can be sure that the repo returns the id
				return schoolExternalTool.id as string;
			}
		);

		await Promise.all([
			this.courseExternalToolRepo.deleteBySchoolExternalToolIds(schoolExternalToolIds),
			this.schoolExternalToolRepo.deleteByToolId(toolId),
			this.externalToolRepo.deleteById(toolId),
		]);
	}

	isLti11Config(config: ExternalToolConfigDO): config is Lti11ToolConfigDO {
		return ToolConfigType.LTI11 === config.type;
	}

	isOauth2Config(config: ExternalToolConfigDO): config is Oauth2ToolConfigDO {
		return ToolConfigType.OAUTH2 === config.type;
	}
}
