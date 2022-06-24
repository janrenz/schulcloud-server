import jwt from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import JwksRsa from 'jwks-rsa';
import QueryString from 'qs';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { OauthConfig, System, User } from '@shared/domain';
import { Logger } from '@src/core/logger';
import { SymetricKeyEncryptionService } from '@shared/infra/encryption';
import { SystemRepo, UserRepo } from '@shared/repo';
import { Configuration } from '@hpi-schul-cloud/commons';
import { TokenRequestPayloadMapper } from '../mapper/token-request-payload.mapper';
import { TokenRequestPayload } from '../controller/dto/token-request.payload';
import { OAuthSSOError } from '../error/oauth-sso.error';
import { OauthTokenResponse } from '../controller/dto/oauth-token.response';
import { FeathersJwtProvider } from '../../authorization';
import { IservOAuthService } from './iserv-oauth.service';
import { IJwt } from '../interface/jwt.base.interface';
import { OAuthResponse } from './dto/oauth.response';
import { AuthorizationParams } from '../controller/dto/authorization.params';

@Injectable()
export class OAuthService {
	constructor(
		private readonly userRepo: UserRepo,
		private readonly systemRepo: SystemRepo,
		private readonly jwtService: FeathersJwtProvider,
		private readonly httpService: HttpService,
		private readonly oAuthEncryptionService: SymetricKeyEncryptionService,
		private iservOauthService: IservOAuthService,
		private logger: Logger
	) {
		this.logger.setContext(OAuthService.name);
	}

	/**
	 * @query query input that has either a code or an error
	 * @return authorization code or throws an error
	 */
	checkAuthorizationCode(query: AuthorizationParams): string {
		if (query.code) {
			return query.code;
		}

		let errorCode = 'sso_auth_code_step';

		if (query.error) {
			errorCode = `sso_oauth_${query.error}`;
			this.logger.error(`SSO Oauth authorization code request return with an error: ${query.code as string}`);
		}
		throw new OAuthSSOError('Authorization Query Object has no authorization code or error', errorCode);
	}

	async requestToken(code: string, oauthConfig: OauthConfig): Promise<OauthTokenResponse> {
		const decryptedClientSecret: string = this.oAuthEncryptionService.decrypt(oauthConfig.clientSecret);
		const tokenRequestPayload: TokenRequestPayload = TokenRequestPayloadMapper.mapToResponse(
			oauthConfig,
			decryptedClientSecret,
			code
		);
		const responseTokenObservable = this.httpService.post<OauthTokenResponse>(
			tokenRequestPayload.tokenEndpoint,
			QueryString.stringify(tokenRequestPayload.tokenRequestParams),
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);
		const responseToken = await lastValueFrom(responseTokenObservable);
		return responseToken.data;
	}

	async _getPublicKey(oauthConfig: OauthConfig): Promise<string> {
		const client: JwksRsa.JwksClient = JwksRsa({
			cache: true,
			jwksUri: oauthConfig.jwksEndpoint,
		});
		const key: JwksRsa.SigningKey = await client.getSigningKey();
		return key.getPublicKey();
	}

	async validateToken(idToken: string, oauthConfig: OauthConfig): Promise<IJwt> {
		const publicKey = await this._getPublicKey(oauthConfig);
		const verifiedJWT = jwt.verify(idToken, publicKey, {
			algorithms: ['RS256'],
			issuer: oauthConfig.issuer,
			audience: oauthConfig.clientId,
		});
		if (typeof verifiedJWT === 'string' || verifiedJWT instanceof String)
			throw new OAuthSSOError('Failed to validate idToken', 'sso_token_verfication_error');
		return verifiedJWT as IJwt;
	}

	async findUser(decodedJwt: IJwt, system: System): Promise<User> {
		// iserv strategy
		if (system.oauthConfig && system.oauthConfig.provider === 'iserv') {
			return this.iservOauthService.findUserById(system.id, decodedJwt);
		}
		// TODO in general

		try {
			const user = await this.userRepo.findById(decodedJwt.sub);
			return user;
		} catch (error) {
			throw new OAuthSSOError('Failed to find user with this Id', 'sso_user_notfound');
		}
	}

	async getJWTForUser(user: User): Promise<string> {
		const jwtResponse: string = await this.jwtService.generateJwt(user.id);
		return jwtResponse;
	}

	buildResponse(oauthConfig: OauthConfig, queryToken: OauthTokenResponse) {
		const response: OAuthResponse = new OAuthResponse();
		response.idToken = queryToken.id_token;
		response.logoutEndpoint = oauthConfig.logoutEndpoint;
		response.provider = oauthConfig.provider;
		return response;
	}

	async processOAuth(query: AuthorizationParams, systemId: string): Promise<OAuthResponse> {
		try {
			const authCode: string = this.checkAuthorizationCode(query);
			const system: System = await this.systemRepo.findById(systemId);
			const { oauthConfig } = system;
			if (oauthConfig == null) {
				this.logger.error(
					`SSO Oauth process couldn't be started, because of missing oauthConfig of system: ${system.id}`
				);
				throw new OAuthSSOError('Requested system has no oauth configured', 'sso_internal_error');
			}
			const queryToken: OauthTokenResponse = await this.requestToken(authCode, oauthConfig);
			const decodedToken: IJwt = await this.validateToken(queryToken.id_token, oauthConfig);
			const user: User = await this.findUser(decodedToken, system);
			const jwtResponse: string = await this.getJWTForUser(user);
			const response: OAuthResponse = this.buildResponse(oauthConfig, queryToken);
			const oauthResponse: OAuthResponse = this.getRedirect(response);
			oauthResponse.jwt = jwtResponse;
			return oauthResponse;
		} catch (error) {
			this.logger.log(error);
			return this.getOAuthError(error as string);
		}
	}

	getRedirect(response: OAuthResponse): OAuthResponse {
		const HOST = Configuration.get('HOST') as string;
		let redirect: string;
		const oauthResponse: OAuthResponse = new OAuthResponse();
		// iserv strategy
		if (response.provider === 'iserv') {
			const idToken = response.idToken as string;
			const logoutEndpoint = response.logoutEndpoint as string;
			redirect = `${logoutEndpoint}?id_token_hint=${idToken}&post_logout_redirect_uri=${HOST}/dashboard`;
		} else {
			redirect = `${HOST}/dashboard`;
		}
		oauthResponse.redirect = redirect;
		return oauthResponse;
	}

	getOAuthError(error: any): OAuthResponse {
		this.logger.error(error);
		const oauthResponse = new OAuthResponse();
		if (error instanceof OAuthSSOError) {
			oauthResponse.errorcode = error.errorcode;
		} else {
			oauthResponse.errorcode = 'oauth_login_failed';
		}
		oauthResponse.redirect = `${Configuration.get('HOST') as string}/login?error=${oauthResponse.errorcode}`;
		return oauthResponse;
	}
}