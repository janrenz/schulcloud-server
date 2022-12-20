import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExternalToolRepo } from '@shared/repo/externaltool/external-tool.repo';
import { ExternalToolDO, Lti11ToolConfigDO, Oauth2ToolConfigDO } from '@shared/domain/domainobject/external-tool';
import { IFindOptions, SortOrder } from '@shared/domain';
import {
	customParameterDOFactory,
	externalToolDOFactory,
	lti11ToolConfigDOFactory,
	oauth2ToolConfigDOFactory,
} from '@shared/testing/factory/domainobject/external-tool.factory';
import { OauthProviderService } from '@shared/infra/oauth-provider';
import { DefaultEncryptionService, IEncryptionService } from '@shared/infra/encryption';
import { ProviderOauthClient } from '@shared/infra/oauth-provider/dto';
import { Page } from '@shared/domain/interface/page';
import { SchoolExternalToolDO } from '@shared/domain/domainobject/external-tool/school-external-tool.do';
import { CourseExternalToolRepo } from '@shared/repo/courseexternaltool/course-external-tool.repo';
import { SchoolExternalToolRepo } from '@shared/repo/schoolexternaltool/school-external-tool.repo';
import { ExternalToolService } from './external-tool.service';
import { ExternalToolServiceMapper } from './mapper';

describe('ExternalToolService', () => {
	let module: TestingModule;
	let service: ExternalToolService;

	let externalToolRepo: DeepMocked<ExternalToolRepo>;
	let schoolToolRepo: DeepMocked<SchoolExternalToolRepo>;
	let courseToolRepo: DeepMocked<CourseExternalToolRepo>;
	let oauthProviderService: DeepMocked<OauthProviderService>;
	let mapper: DeepMocked<ExternalToolServiceMapper>;
	let encryptionService: DeepMocked<IEncryptionService>;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [
				ExternalToolService,
				{
					provide: ExternalToolRepo,
					useValue: createMock<ExternalToolRepo>(),
				},
				{
					provide: OauthProviderService,
					useValue: createMock<OauthProviderService>(),
				},
				{
					provide: ExternalToolServiceMapper,
					useValue: createMock<ExternalToolServiceMapper>(),
				},
				{
					provide: DefaultEncryptionService,
					useValue: createMock<IEncryptionService>(),
				},
				{
					provide: SchoolExternalToolRepo,
					useValue: createMock<SchoolExternalToolRepo>(),
				},
				{
					provide: CourseExternalToolRepo,
					useValue: createMock<CourseExternalToolRepo>(),
				},
			],
		}).compile();

		service = module.get(ExternalToolService);
		externalToolRepo = module.get(ExternalToolRepo);
		schoolToolRepo = module.get(SchoolExternalToolRepo);
		courseToolRepo = module.get(CourseExternalToolRepo);
		oauthProviderService = module.get(OauthProviderService);
		mapper = module.get(ExternalToolServiceMapper);
		encryptionService = module.get(DefaultEncryptionService);
	});

	afterAll(async () => {
		await module.close();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = () => {
		const externalToolDO: ExternalToolDO = externalToolDOFactory.withCustomParameters(1).buildWithId();
		const oauth2ToolConfigDO: Oauth2ToolConfigDO = oauth2ToolConfigDOFactory.withExternalData().build();
		const oauth2ToolConfigDOWithoutExternalData: Oauth2ToolConfigDO = oauth2ToolConfigDOFactory.build();
		const lti11ToolConfigDO: Lti11ToolConfigDO = lti11ToolConfigDOFactory.build();

		const oauthClient: ProviderOauthClient = {
			client_id: oauth2ToolConfigDO.clientId,
			scope: oauth2ToolConfigDO.scope,
			token_endpoint_auth_method: oauth2ToolConfigDO.tokenEndpointAuthMethod,
			redirect_uris: oauth2ToolConfigDO.redirectUris,
			frontchannel_logout_uri: oauth2ToolConfigDO.frontchannelLogoutUri,
		};

		return {
			externalToolDO,
			oauth2ToolConfigDO,
			lti11ToolConfigDO,
			oauth2ToolConfigDOWithoutExternalData,
			oauthClient,
		};
	};

	describe('createExternalTool', () => {
		describe('when basic config', () => {
			it('should call the repo to save a tool', async () => {
				const { externalToolDO } = setup();
				externalToolRepo.save.mockResolvedValue(externalToolDO);

				await service.createExternalTool(externalToolDO);

				expect(externalToolRepo.save).toHaveBeenCalledWith(externalToolDO);
			});

			it('should save DO', async () => {
				const { externalToolDO } = setup();
				externalToolRepo.save.mockResolvedValue(externalToolDO);

				const result: ExternalToolDO = await service.createExternalTool(externalToolDO);

				expect(result).toEqual(externalToolDO);
			});
		});

		describe('when oauth2 config', () => {
			const setupOauth2 = () => {
				const { externalToolDO, oauth2ToolConfigDO, oauthClient } = setup();
				externalToolDO.config = oauth2ToolConfigDO;

				mapper.mapDoToProviderOauthClient.mockReturnValue(oauthClient);
				externalToolRepo.save.mockResolvedValue(externalToolDO);

				return { externalToolDO, oauth2ToolConfigDO, oauthClient };
			};

			it('should create oauth2 client', async () => {
				const { externalToolDO, oauthClient } = setupOauth2();

				await service.createExternalTool(externalToolDO);

				expect(oauthProviderService.createOAuth2Client).toHaveBeenCalledWith(oauthClient);
			});

			it('should call the repo to save a tool', async () => {
				const { externalToolDO } = setupOauth2();

				await service.createExternalTool(externalToolDO);

				expect(externalToolRepo.save).toHaveBeenCalledWith(externalToolDO);
			});

			it('should save DO', async () => {
				const { externalToolDO } = setupOauth2();

				const result: ExternalToolDO = await service.createExternalTool(externalToolDO);

				expect(result).toEqual(externalToolDO);
			});
		});

		describe('when lti11 config', () => {
			const setupLti11 = () => {
				const encryptedSecret = 'encryptedSecret';
				const { externalToolDO, lti11ToolConfigDO } = setup();
				externalToolDO.config = lti11ToolConfigDO;
				const lti11ToolConfigDOEncrypted: Lti11ToolConfigDO = { ...lti11ToolConfigDO, secret: encryptedSecret };
				const externalToolDOEncrypted: ExternalToolDO = { ...externalToolDO, config: lti11ToolConfigDOEncrypted };

				encryptionService.encrypt.mockReturnValue(encryptedSecret);
				externalToolRepo.save.mockResolvedValue(externalToolDOEncrypted);

				return { externalToolDO, lti11ToolConfigDO, encryptedSecret, externalToolDOEncrypted };
			};

			it('should encrypt the secret', async () => {
				const { externalToolDO } = setupLti11();

				await service.createExternalTool(externalToolDO);

				expect(encryptionService.encrypt).toHaveBeenCalledWith('secret');
			});

			it('should call the repo to save a tool', async () => {
				const { externalToolDO } = setupLti11();

				await service.createExternalTool(externalToolDO);

				expect(externalToolRepo.save).toHaveBeenCalledWith(externalToolDO);
			});

			it('should save DO', async () => {
				const { externalToolDO, externalToolDOEncrypted } = setupLti11();

				const result: ExternalToolDO = await service.createExternalTool(externalToolDO);

				expect(result).toEqual(externalToolDOEncrypted);
			});
		});
	});

	describe('findExternalTool', () => {
		const setupFind = () => {
			const { externalToolDO } = setup();
			const page = new Page<ExternalToolDO>([externalToolDO], 1);
			const query: Partial<ExternalToolDO> = {
				id: 'toolId',
				name: 'toolName',
			};
			const options: IFindOptions<ExternalToolDO> = {
				order: {
					id: SortOrder.asc,
					name: SortOrder.asc,
				},
				pagination: {
					limit: 2,
					skip: 1,
				},
			};

			return {
				query,
				options,
				page,
			};
		};

		it('should get DOs', async () => {
			const { query, options, page } = setupFind();
			externalToolRepo.find.mockResolvedValue(page);

			const result: Page<ExternalToolDO> = await service.findExternalTools(query, options);

			expect(result).toEqual(page);
		});

		it('should get DOs and add external oauth2 data', async () => {
			const { query, options, page } = setupFind();
			const { externalToolDO, oauth2ToolConfigDOWithoutExternalData, oauth2ToolConfigDO, oauthClient } = setup();
			oauth2ToolConfigDO.clientSecret = undefined;
			externalToolDO.config = oauth2ToolConfigDOWithoutExternalData;
			page.data = [externalToolDO];
			externalToolRepo.find.mockResolvedValue(page);
			oauthProviderService.getOAuth2Client.mockResolvedValue(oauthClient);

			const result: Page<ExternalToolDO> = await service.findExternalTools(query, options);

			expect(result).toEqual({ data: [{ ...externalToolDO, config: oauth2ToolConfigDO }], total: 1 });
		});
	});

	describe('findExternalToolById', () => {
		it('should get DO', async () => {
			const { externalToolDO } = setup();
			externalToolRepo.findById.mockResolvedValue(externalToolDO);

			const result: ExternalToolDO = await service.findExternalToolById('toolId');

			expect(result).toEqual(externalToolDO);
		});

		it('should get DO and add external oauth2 data', async () => {
			const { externalToolDO, oauth2ToolConfigDOWithoutExternalData, oauth2ToolConfigDO, oauthClient } = setup();
			oauth2ToolConfigDO.clientSecret = undefined;
			externalToolDO.config = oauth2ToolConfigDOWithoutExternalData;
			externalToolRepo.findById.mockResolvedValue(externalToolDO);
			oauthProviderService.getOAuth2Client.mockResolvedValue(oauthClient);

			const result: ExternalToolDO = await service.findExternalToolById('toolId');

			expect(result).toEqual({ ...externalToolDO, config: oauth2ToolConfigDO });
		});
	});

	describe('deleteExternalTool', () => {
		const setupDelete = () => {
			const schoolExternalToolDO: SchoolExternalToolDO = new SchoolExternalToolDO({
				id: 'schoolTool1',
				toolId: 'tool1',
				schoolId: 'school1',
				parameters: [],
				toolVersion: 1,
			});

			schoolToolRepo.findByToolId.mockResolvedValue([schoolExternalToolDO]);

			return { schoolExternalToolDO };
		};

		it('should delete all related CourseExternalTools', async () => {
			const toolId = 'tool1';
			setup();
			const { schoolExternalToolDO } = setupDelete();

			await service.deleteExternalTool(toolId);

			expect(courseToolRepo.deleteBySchoolExternalToolIds).toHaveBeenCalledWith([schoolExternalToolDO.id]);
		});

		it('should delete all related SchoolExternalTools', async () => {
			const toolId = 'tool1';
			setup();
			setupDelete();

			await service.deleteExternalTool(toolId);

			expect(schoolToolRepo.deleteByToolId).toHaveBeenCalledWith(toolId);
		});

		it('should delete the ExternalTool', async () => {
			const toolId = 'tool1';
			setup();
			setupDelete();

			await service.deleteExternalTool(toolId);

			expect(externalToolRepo.deleteById).toHaveBeenCalledWith(toolId);
		});
	});

	describe('isNameUnique', () => {
		it('should find a tool with this name', async () => {
			const { externalToolDO } = setup();
			externalToolRepo.findByName.mockResolvedValue(null);

			const expected: boolean = await service.isNameUnique(externalToolDO);

			expect(expected).toEqual(true);
			expect(externalToolRepo.findByName).toHaveBeenCalledWith(externalToolDO.name);
		});

		it('should not find a tool with this name', async () => {
			const { externalToolDO } = setup();
			externalToolRepo.findByName.mockResolvedValue(externalToolDO);

			const expected: boolean = await service.isNameUnique(externalToolDO);

			expect(expected).toEqual(false);
			expect(externalToolRepo.findByName).toHaveBeenCalledWith(externalToolDO.name);
		});
	});

	describe('isClientIdUnique', () => {
		it('should find a tool with this client id', async () => {
			const { oauth2ToolConfigDO } = setup();
			externalToolRepo.findByOAuth2ConfigClientId.mockResolvedValue(null);

			const expected: boolean = await service.isClientIdUnique(oauth2ToolConfigDO);

			expect(expected).toEqual(true);
			expect(externalToolRepo.findByOAuth2ConfigClientId).toHaveBeenCalledWith(oauth2ToolConfigDO.clientId);
		});

		it('should not find a tool with this client id', async () => {
			const { externalToolDO, oauth2ToolConfigDO } = setup();
			externalToolRepo.findByOAuth2ConfigClientId.mockResolvedValue(externalToolDO);

			const expected: boolean = await service.isClientIdUnique(oauth2ToolConfigDO);

			expect(expected).toEqual(false);
			expect(externalToolRepo.findByOAuth2ConfigClientId).toHaveBeenCalledWith(oauth2ToolConfigDO.clientId);
		});
	});

	describe('hasDuplicateAttributes', () => {
		it('should not find duplicate custom parameters if there are none', () => {
			const customParameterDO = customParameterDOFactory.build();

			const expected: boolean = service.hasDuplicateAttributes([customParameterDO]);

			expect(expected).toEqual(false);
		});

		it('should find duplicate custom parameters if there are any', () => {
			const customParameterDO = customParameterDOFactory.build();

			const expected: boolean = service.hasDuplicateAttributes([customParameterDO, customParameterDO]);

			expect(expected).toEqual(true);
		});
	});

	describe('validateByRegex', () => {
		it('should validate the regular expression', () => {
			const customParameterDO = customParameterDOFactory.build();

			const expected: boolean = service.validateByRegex([customParameterDO]);

			expect(expected).toEqual(true);
		});

		it('should not validate a faulty regular expression', () => {
			const customParameterDO = customParameterDOFactory.build({ regex: '[' });

			const expected: boolean = service.validateByRegex([customParameterDO]);

			expect(expected).toEqual(false);
		});
	});
});