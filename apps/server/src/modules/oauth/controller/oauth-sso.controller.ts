import { Configuration } from '@hpi-schul-cloud/commons/lib';
import { Controller, Get, Param, Query, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ICurrentUser } from '@shared/domain';
import { Logger } from '@src/core/logger';
import { Authenticate, CurrentUser } from '@src/modules/authentication/decorator/auth.decorator';
import { OauthTokenResponse } from '@src/modules/oauth/controller/dto/oauth-token.response';
import { HydraOauthUc } from '@src/modules/oauth/uc/hydra-oauth.uc';
import { CookieOptions, Request, Response } from 'express';
import { OauthUc } from '../uc';
import { AuthorizationParams, SystemUrlParams } from './dto';

@ApiTags('SSO')
@Controller('sso')
export class OauthSSOController {
	constructor(private readonly oauthUc: OauthUc, private readonly hydraUc: HydraOauthUc, private logger: Logger) {
		this.logger.setContext(OauthSSOController.name);
	}

	// TODO The system lookup must not be part of the path but of the token instead (EW-325)
	@Get('oauth/:systemId')
	async startOauthAuthorizationCodeFlow(
		@Query() query: AuthorizationParams,
		@Res() res: Response,
		@Param() urlParams: SystemUrlParams
	): Promise<void> {
		const oauthResponse = await this.oauthUc.processOAuth(query, urlParams.systemId);
		const cookieDefaultOptions: CookieOptions = {
			httpOnly: Configuration.get('COOKIE__HTTP_ONLY') as boolean,
			sameSite: Configuration.get('COOKIE__SAME_SITE') as 'lax' | 'strict' | 'none',
			secure: Configuration.get('COOKIE__SECURE') as boolean,
			expires: new Date(Date.now() + (Configuration.get('COOKIE__EXPIRES_SECONDS') as number)),
		};

		if (oauthResponse.jwt) {
			res.cookie('jwt', oauthResponse.jwt, cookieDefaultOptions);
		}
		if (oauthResponse.redirect) {
			res.redirect(oauthResponse.redirect);
		}
	}

	@Get('hydra/:oauthClientId')
	@Authenticate('jwt')
	async getHydraOauthToken(
		@Query() query: AuthorizationParams,
		@Param('oauthClientId') oauthClientId: string
	): Promise<OauthTokenResponse> {
		const oauthToken = this.hydraUc.getOauthToken(query, oauthClientId);
		return oauthToken;
	}

	@Get('auth/:oauthClientId')
	@Authenticate('jwt')
	async requestAuthToken(
		@CurrentUser() currentUser: ICurrentUser,
		@Req() req: Request,
		@Param('oauthClientId') oauthClientId: string
	): Promise<AuthorizationParams> {
		let jwt: string;
		const authHeader: string | undefined = req.headers.authorization;
		if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
			[, jwt] = authHeader.split(' ');
		} else {
			throw new UnauthorizedException(
				`No bearer token in header for authorization process of user ${currentUser.userId} on oauth system ${oauthClientId}`
			);
		}
		return this.hydraUc.requestAuthCode(currentUser.userId, jwt, oauthClientId);
	}

	@Get('oauth/:systemId/migration')
	@Authenticate('jwt')
	@ApiOkResponse({ description: 'The User has been succesfully migrated.' })
	async migrateUser(
		@CurrentUser() currentUser,
		@Query() query: AuthorizationParams,
		@Res() res: Response,
		@Param() urlParams: SystemUrlParams
	): Promise<void> {
		const migration = await this.oauthUc.migrateUser(currentUser.userId, query, urlParams.systemId);
		if (migration.redirect) {
			res.redirect(migration.redirect);
		}
	}
}
