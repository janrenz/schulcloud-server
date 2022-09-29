import { Test, TestingModule } from '@nestjs/testing';
import { OauthProviderLogoutFlowUc } from '@src/modules/oauth-provider/uc/oauth-provider.logout-flow.uc';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { NotImplementedException } from '@nestjs/common';
import { Configuration } from '@hpi-schul-cloud/commons/lib';
import { OauthProviderResponseMapper } from '@src/modules/oauth-provider/mapper/oauth-provider-response.mapper';
import {
	AcceptQuery,
	ChallengeParams,
	ConsentRequestBody,
	ConsentResponse,
	ConsentSessionResponse,
	OauthClientBody,
	OauthClientResponse,
} from '@src/modules/oauth-provider/controller/dto';
import { RedirectResponse } from '@src/modules/oauth-provider/controller/dto/response/redirect.response';
import { ProviderConsentResponse, ProviderConsentSessionResponse } from '@shared/infra/oauth-provider/dto';
import { OauthProviderConsentFlowUc } from '@src/modules/oauth-provider/uc/oauth-provider.consent-flow.uc';
import { ICurrentUser } from '@shared/domain';
import { OauthProviderUc } from '@src/modules/oauth-provider/uc/oauth-provider.uc';
import { OauthProviderController } from './oauth-provider.controller';
import { OauthProviderClientCrudUc } from '../uc/oauth-provider.client-crud.uc';

describe('OauthProviderController', () => {
	let module: TestingModule;
	let controller: OauthProviderController;

	let oauthProviderUc: DeepMocked<OauthProviderUc>;
	let logoutUc: DeepMocked<OauthProviderLogoutFlowUc>;
	let consentUc: DeepMocked<OauthProviderConsentFlowUc>;
	let crudUc: DeepMocked<OauthProviderClientCrudUc>;
	let responseMapper: DeepMocked<OauthProviderResponseMapper>;

	const hydraUri = 'http://hydra.uri';
	const currentUser: ICurrentUser = { userId: 'userId' } as ICurrentUser;

	beforeAll(async () => {
		jest.spyOn(Configuration, 'get').mockReturnValue(hydraUri);

		module = await Test.createTestingModule({
			providers: [
				OauthProviderController,
				{
					provide: OauthProviderUc,
					useValue: createMock<OauthProviderUc>(),
				},
				{
					provide: OauthProviderClientCrudUc,
					useValue: createMock<OauthProviderClientCrudUc>(),
				},
				{
					provide: OauthProviderLogoutFlowUc,
					useValue: createMock<OauthProviderLogoutFlowUc>(),
				},
				{
					provide: OauthProviderConsentFlowUc,
					useValue: createMock<OauthProviderConsentFlowUc>(),
				},
				{
					provide: OauthProviderResponseMapper,
					useValue: createMock<OauthProviderResponseMapper>(),
				},
			],
		}).compile();

		controller = module.get(OauthProviderController);
		oauthProviderUc = module.get(OauthProviderUc);
		crudUc = module.get(OauthProviderClientCrudUc);
		logoutUc = module.get(OauthProviderLogoutFlowUc);
		responseMapper = module.get(OauthProviderResponseMapper);
		consentUc = module.get(OauthProviderConsentFlowUc);
	});

	afterAll(async () => {
		await module.close();
	});

	describe('Client Flow', () => {
		describe('getOAuth2Client', () => {
			it('should get oauth2 client', async () => {
				const data: OauthClientBody = {
					client_id: 'clientId',
				};
				crudUc.getOAuth2Client.mockResolvedValue(data);
				responseMapper.mapOauthClientResponse.mockReturnValue(new OauthClientResponse({ ...data }));

				const result: OauthClientResponse = await controller.getOAuth2Client(currentUser, { id: 'clientId' });

				expect(result).toEqual(data);
				expect(crudUc.getOAuth2Client).toHaveBeenCalledWith(currentUser, 'clientId');
			});
		});

		describe('listOAuth2Clients', () => {
			it('should list oauth2 clients when uc is called with all parameters', async () => {
				const data: OauthClientBody = {
					client_id: 'clientId',
				};
				crudUc.listOAuth2Clients.mockResolvedValue([data]);
				responseMapper.mapOauthClientResponse.mockReturnValue(new OauthClientResponse({ ...data }));

				const result: OauthClientResponse[] = await controller.listOAuth2Clients(currentUser, {
					limit: 1,
					offset: 0,
					client_name: 'clientId',
					owner: 'clientOwner',
				});

				expect(result).toEqual([data]);
				expect(crudUc.listOAuth2Clients).toHaveBeenCalledWith(currentUser, 1, 0, 'clientId', 'clientOwner');
			});

			it('should list oauth2 clients when uc is called without parameters', async () => {
				const data: OauthClientBody = {
					client_id: 'clientId',
				};
				crudUc.listOAuth2Clients.mockResolvedValue([data]);
				responseMapper.mapOauthClientResponse.mockReturnValue(new OauthClientResponse({ ...data }));

				const result: OauthClientResponse[] = await controller.listOAuth2Clients(currentUser, {});

				expect(result).toEqual([data]);
				expect(crudUc.listOAuth2Clients).toHaveBeenCalledWith(currentUser, undefined, undefined, undefined, undefined);
			});
		});

		describe('createOAuth2Client', () => {
			it('should create oauth2 client with defaults', async () => {
				const data: OauthClientBody = {
					client_id: 'clientId',
				};
				crudUc.createOAuth2Client.mockResolvedValue(data);
				responseMapper.mapOauthClientResponse.mockReturnValue(new OauthClientResponse({ ...data }));

				const result: OauthClientResponse = await controller.createOAuth2Client(currentUser, data);

				expect(crudUc.createOAuth2Client).toHaveBeenCalledWith(currentUser, data);
				expect(result).toEqual(data);
			});
		});

		describe('updateOAuth2Client', () => {
			it('should update oauth2 client with defaults', async () => {
				const data: OauthClientBody = {
					client_id: 'clientId',
				};
				crudUc.updateOAuth2Client.mockResolvedValue(data);
				responseMapper.mapOauthClientResponse.mockReturnValue(new OauthClientResponse({ ...data }));

				const result: OauthClientResponse = await controller.updateOAuth2Client(
					currentUser,
					{ id: 'clientId' },
					{ client_id: 'clientId' }
				);

				expect(crudUc.updateOAuth2Client).toHaveBeenCalledWith(currentUser, 'clientId', data);
				expect(result).toEqual(data);
			});
		});

		describe('deleteOAuth2Client', () => {
			it('should delete oauth2 client', async () => {
				await controller.deleteOAuth2Client(currentUser, { id: 'clientId' });

				expect(crudUc.deleteOAuth2Client).toHaveBeenCalledWith(currentUser, 'clientId');
			});
		});
	});

	describe('Consent Flow', () => {
		let challengeParams: ChallengeParams;

		beforeEach(() => {
			challengeParams = { challenge: 'challengexyz' };
		});

		describe('getConsentRequest', () => {
			let consentResponse: ProviderConsentResponse;

			beforeEach(() => {
				consentResponse = {
					challenge: challengeParams.challenge,
					subject: 'subject',
				};
			});

			it('should return a consentResponse', async () => {
				consentUc.getConsentRequest.mockResolvedValue(consentResponse);
				responseMapper.mapConsentResponse.mockReturnValue(new ConsentResponse({ ...consentResponse }));

				const result: ConsentResponse = await controller.getConsentRequest(challengeParams);

				expect(result.challenge).toEqual(consentResponse.challenge);
				expect(result.subject).toEqual(consentResponse.subject);
			});

			it('should call mapper', async () => {
				consentUc.getConsentRequest.mockResolvedValue(consentResponse);
				responseMapper.mapConsentResponse.mockReturnValue(new ConsentResponse({ ...consentResponse }));

				await controller.getConsentRequest(challengeParams);

				expect(responseMapper.mapConsentResponse).toHaveBeenCalledWith(consentResponse);
			});

			it('should call uc', async () => {
				consentUc.getConsentRequest.mockResolvedValue(consentResponse);
				responseMapper.mapConsentResponse.mockReturnValue(new ConsentResponse({ ...consentResponse }));

				await controller.getConsentRequest(challengeParams);

				expect(consentUc.getConsentRequest).toHaveBeenCalledWith(consentResponse.challenge);
			});
		});

		describe('patchConsentRequest', () => {
			let acceptQuery: AcceptQuery;
			let consentRequestBody: ConsentRequestBody;

			beforeEach(() => {
				acceptQuery = { accept: true };
				consentRequestBody = {
					grant_scope: ['openid', 'offline'],
					remember: false,
					remember_for: 0,
				};
			});

			it('should call uc', async () => {
				await controller.patchConsentRequest(challengeParams, acceptQuery, consentRequestBody, currentUser);

				expect(consentUc.patchConsentRequest).toHaveBeenCalledWith(
					challengeParams.challenge,
					acceptQuery,
					consentRequestBody,
					currentUser
				);
			});

			it('should call mapper', async () => {
				const expectedRedirectResponse: RedirectResponse = { redirect_to: 'anywhere' };
				consentUc.patchConsentRequest.mockResolvedValue(expectedRedirectResponse);

				await controller.patchConsentRequest(challengeParams, acceptQuery, consentRequestBody, currentUser);

				expect(responseMapper.mapRedirectResponse).toHaveBeenCalledWith(expectedRedirectResponse);
			});

			it('should return redirect response', async () => {
				const expectedRedirectResponse: RedirectResponse = { redirect_to: 'anywhere' };
				consentUc.patchConsentRequest.mockResolvedValue(expectedRedirectResponse);
				responseMapper.mapRedirectResponse.mockReturnValue(expectedRedirectResponse);

				const result: RedirectResponse = await controller.patchConsentRequest(
					challengeParams,
					acceptQuery,
					consentRequestBody,
					currentUser
				);

				expect(result.redirect_to).toEqual(expectedRedirectResponse.redirect_to);
			});
		});

		describe('listConsentSessions', () => {
			it('should list all consent sessions', async () => {
				const session: ProviderConsentSessionResponse = {
					consent_request: {
						challenge: 'challenge',
						client: {
							client_id: 'clientId',
							client_name: 'clientName',
						},
					},
				};
				const response: ConsentSessionResponse = new ConsentSessionResponse(
					session.consent_request.challenge,
					session.consent_request.client?.client_id,
					session.consent_request.client?.client_name
				);

				oauthProviderUc.listConsentSessions.mockResolvedValue([session]);
				responseMapper.mapConsentSessionsToResponse.mockReturnValue(response);

				const result: ConsentSessionResponse[] = await controller.listConsentSessions(currentUser);

				expect(result).toEqual([response]);
				expect(oauthProviderUc.listConsentSessions).toHaveBeenCalledWith(currentUser.userId);
			});
		});

		describe('revokeConsentSession', () => {
			it('should revoke consent sessions', async () => {
				await controller.revokeConsentSession(currentUser, { client: 'clientId' });

				expect(oauthProviderUc.revokeConsentSession).toHaveBeenCalledWith(currentUser.userId, 'clientId');
			});
		});
	});

	describe('Login Flow', () => {
		describe('getLoginRequest', () => {
			it('should throw', () => {
				expect(() => controller.getLoginRequest({ challenge: '' })).toThrow(NotImplementedException);
			});
		});

		describe('patchLoginRequest', () => {
			it('should throw', () => {
				expect(() => controller.patchLoginRequest({ challenge: '' }, { accept: false }, {})).toThrow(
					NotImplementedException
				);
			});
		});
	});

	describe('Logout Flow', () => {
		describe('acceptLogoutRequest', () => {
			it('should call uc and return redirect string', async () => {
				const expectedRedirect: RedirectResponse = new RedirectResponse({ redirect_to: 'www.mock.de' });
				logoutUc.logoutFlow.mockResolvedValue(expectedRedirect);
				responseMapper.mapRedirectResponse.mockReturnValue(expectedRedirect);

				const redirect = await controller.acceptLogoutRequest(
					{ challenge: 'challenge_mock' },
					{ redirect_to: 'www.mock.de' }
				);

				expect(logoutUc.logoutFlow).toHaveBeenCalledWith('challenge_mock');
				expect(redirect.redirect_to).toEqual(expectedRedirect.redirect_to);
			});
		});
	});

	describe('introspectOAuth2Token', () => {
		it('should throw', () => {
			expect(() => controller.introspectOAuth2Token({ token: '' })).toThrow(NotImplementedException);
		});
	});

	describe('getUrl', () => {
		it('should return hydra uri', async () => {
			const result: string = await controller.getUrl();

			expect(result).toEqual(hydraUri);
		});
	});
});
