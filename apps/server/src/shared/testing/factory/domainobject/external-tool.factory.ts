import {
	BasicToolConfigDO,
	CustomParameterDO,
	ExternalToolDO,
	Lti11ToolConfigDO,
	Oauth2ToolConfigDO,
} from '@shared/domain/domainobject/external-tool';
import { DeepPartial } from 'fishery';
import { DoBaseFactory } from './do-base.factory';
import {
	CustomParameterLocation,
	CustomParameterScope,
	CustomParameterType,
	LtiMessageType,
	LtiPrivacyPermission,
	ToolConfigType,
} from '../../../domain';
import { TokenEndpointAuthMethod } from '../../../../modules/tool/interface/token-endpoint-auth-method.enum';

export const basicToolConfigDOFactory = DoBaseFactory.define<BasicToolConfigDO, BasicToolConfigDO>(
	BasicToolConfigDO,
	() => ({
		type: ToolConfigType.BASIC,
		baseUrl: 'https://www.basic-baseUrl.com/',
	})
);

class Oauth2ToolConfigDOFactory extends DoBaseFactory<Oauth2ToolConfigDO, Oauth2ToolConfigDO> {
	withExternalData(oauth2Params?: DeepPartial<Oauth2ToolConfigDO>): this {
		const params: DeepPartial<Oauth2ToolConfigDO> = {
			clientSecret: 'clientSecret',
			scope: 'offline openid',
			frontchannelLogoutUri: 'https://www.frontchannel.com/',
			redirectUris: ['https://www.redirect.com/'],
			tokenEndpointAuthMethod: TokenEndpointAuthMethod.CLIENT_SECRET_POST,
		};

		return this.params({ ...params, ...oauth2Params });
	}
}

export const oauth2ToolConfigDOFactory = Oauth2ToolConfigDOFactory.define(Oauth2ToolConfigDO, () => ({
	type: ToolConfigType.OAUTH2,
	baseUrl: 'https://www.oauth2-baseUrl.com/',
	clientId: 'clientId',
	skipConsent: false,
}));

export const lti11ToolConfigDOFactory = DoBaseFactory.define<Lti11ToolConfigDO, Lti11ToolConfigDO>(
	Lti11ToolConfigDO,
	() => ({
		type: ToolConfigType.LTI11,
		baseUrl: 'https://www.oauth2-baseUrl.com/',
		key: 'key',
		secret: 'secret',
		privacy_permission: LtiPrivacyPermission.PSEUDONYMOUS,
		lti_message_type: LtiMessageType.BASIC_LTI_LAUNCH_REQUEST,
		resource_link_id: 'linkId',
	})
);

export const customParameterDOFactory = DoBaseFactory.define<CustomParameterDO, CustomParameterDO>(
	CustomParameterDO,
	({ sequence }) => ({
		name: `custom-parameter-${sequence}`,
		type: CustomParameterType.STRING,
		scope: CustomParameterScope.GLOBAL,
		location: CustomParameterLocation.TOKEN,
	})
);

class ExternalToolDOFactory extends DoBaseFactory<ExternalToolDO, ExternalToolDO> {
	withOauth2Config(customParam?: DeepPartial<Oauth2ToolConfigDO>): this {
		const params: DeepPartial<ExternalToolDO> = {
			config: oauth2ToolConfigDOFactory.build(customParam),
		};

		return this.params(params);
	}

	withCustomParameters(number: number, customParam?: DeepPartial<CustomParameterDO>): this {
		const params: DeepPartial<ExternalToolDO> = {
			parameters: customParameterDOFactory.buildList(number, customParam),
		};

		return this.params(params);
	}
}

export const externalToolDOFactory = ExternalToolDOFactory.define(ExternalToolDO, ({ sequence }) => ({
	name: `external-tool-${sequence}`,
	url: 'https://url.com/',
	config: basicToolConfigDOFactory.build(),
	logoUrl: 'https://logo.com/',
	isHidden: false,
	openNewTab: false,
	version: 1,
}));
