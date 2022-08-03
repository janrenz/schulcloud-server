import { ISystemProperties, System } from '@shared/domain';
import { SystemProvisioningStrategy } from '@shared/domain/interface/system-provisioning.strategy';
import { DeepPartial } from 'fishery';
import { BaseFactory } from './base.factory';

export class SystemFactory extends BaseFactory<System, ISystemProperties> {
	withOauthConfig(): this {
		const params: DeepPartial<ISystemProperties> = {
			oauthConfig: {
				clientId: '12345',
				clientSecret: 'mocksecret',
				tokenEndpoint: 'http://mock.de/mock/auth/public/mockToken',
				grantType: 'authorization_code',
				redirectUri: 'http://mockhost:3030/api/v3/sso/oauth/testsystemId',
				scope: 'openid uuid',
				responseType: 'code',
				authEndpoint: 'mock_authEndpoint',
				provider: 'mock_type',
				logoutEndpoint: 'mock_logoutEndpoint',
				issuer: 'mock_issuer',
				jwksEndpoint: 'mock_jwksEndpoint',
				provisioningUrl: 'mock_provisioningUrl',
			},
		};
		return this.params(params);
	}
}

export const systemFactory = SystemFactory.define(System, ({ sequence }) => {
	return {
		type: 'oauth',
		url: 'http://mock.de',
		alias: `system #${sequence}`,
		provisioningStrategy: SystemProvisioningStrategy.UNDEFINED,
		provisioningUrl: 'provisioningUrl',
	};
});
