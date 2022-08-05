import fs from 'node:fs/promises';
import IdentityProviderRepresentation from '@keycloak/keycloak-admin-client/lib/defs/identityProviderRepresentation';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { System } from '@shared/domain';
import { SystemRepo } from '@shared/repo';
import { SymetricKeyEncryptionService } from '@shared/infra/encryption';
import AuthenticationFlowRepresentation from '@keycloak/keycloak-admin-client/lib/defs/authenticationFlowRepresentation';
import AuthenticationExecutionInfoRepresentation from '@keycloak/keycloak-admin-client/lib/defs/authenticationExecutionInfoRepresentation';
import { IdentityProviderConfig, IKeycloakManagementInputFiles, KeycloakManagementInputFiles } from '../interface';
import { KeycloakAdministrationService } from './keycloak-administration.service';
import { SysType } from '../../sys.type';

enum ConfigureAction {
	CREATE = 'create',
	UPDATE = 'update',
	DELETE = 'delete',
}

export const flowAlias = 'Direct Broker Flow';

export class KeycloakConfigurationService {
	constructor(
		private readonly kcAdmin: KeycloakAdministrationService,
		private readonly systemRepo: SystemRepo,
		private readonly encryptionService: SymetricKeyEncryptionService,
		private readonly configService: ConfigService,
		@Inject(KeycloakManagementInputFiles) private readonly inputFiles: IKeycloakManagementInputFiles
	) {}

	public async configureBrokerFlows(): Promise<void> {
		const kc = await this.kcAdmin.callKcAdminClient();
		const executionProviders = ['idp-create-user-if-unique', 'idp-auto-link'];
		const getFlowsRequest = kc.realms.makeRequest<{ realmName: string }, AuthenticationFlowRepresentation[]>({
			method: 'GET',
			path: '/{realmName}/authentication/flows',
			urlParamKeys: ['realmName'],
		});
		const flows = await getFlowsRequest({ realmName: kc.realmName });
		const flow = flows.find((tempFlow) => tempFlow.alias === flowAlias);
		if (flow && flow.id) {
			return;
		}
		const createFlowRequest = kc.realms.makeRequest<AuthenticationFlowRepresentation & { realmName: string }, void>({
			method: 'POST',
			path: '/{realmName}/authentication/flows',
			urlParamKeys: ['realmName'],
		});
		const getFlowExecutionsRequest = kc.realms.makeRequest<
			{ realmName: string; flowAlias: string },
			AuthenticationExecutionInfoRepresentation[]
		>({
			method: 'GET',
			path: '/{realmName}/authentication/flows/{flowAlias}/executions',
			urlParamKeys: ['realmName', 'flowAlias'],
		});
		const addExecutionRequest = kc.realms.makeRequest<{ realmName: string; flowAlias: string; provider: string }, void>(
			{
				method: 'POST',
				path: '/{realmName}/authentication/flows/{flowAlias}/executions/execution',
				urlParamKeys: ['realmName', 'flowAlias'],
			}
		);
		const updateExecutionRequest = kc.realms.makeRequest<
			AuthenticationExecutionInfoRepresentation & { realmName: string; flowAlias: string },
			void
		>({
			method: 'PUT',
			path: '/{realmName}/authentication/flows/{flowAlias}/executions',
			urlParamKeys: ['realmName', 'flowAlias'],
		});
		await createFlowRequest({
			realmName: kc.realmName,
			alias: flowAlias,
			description: 'First broker login which automatically creates or maps accounts.',
			providerId: 'basic-flow',
			topLevel: true,
			builtIn: false,
		});
		// eslint-disable-next-line no-restricted-syntax
		for (const executionProvider of executionProviders) {
			// eslint-disable-next-line no-await-in-loop
			await addExecutionRequest({
				realmName: kc.realmName,
				flowAlias,
				provider: executionProvider,
			});
		}
		const executions = await getFlowExecutionsRequest({
			realmName: kc.realmName,
			flowAlias,
		});
		// eslint-disable-next-line no-restricted-syntax
		for (const execution of executions) {
			// eslint-disable-next-line no-await-in-loop
			await updateExecutionRequest({
				realmName: kc.realmName,
				flowAlias,
				id: execution.id,
				requirement: 'ALTERNATIVE',
			});
		}
	}

	public async configureIdentityProviders(loadFromJson = false): Promise<number> {
		let count = 0;
		const kc = await this.kcAdmin.callKcAdminClient();
		const oldConfigs = await kc.identityProviders.find();
		const newConfigs = await this.loadConfigs([SysType.OIDC], loadFromJson);
		const configureActions = this.selectConfigureAction(newConfigs, oldConfigs);
		// eslint-disable-next-line no-restricted-syntax
		for (const configureAction of configureActions) {
			if (configureAction.action === ConfigureAction.CREATE) {
				// eslint-disable-next-line no-await-in-loop
				await this.createIdentityProvider(configureAction.config);
				count += 1;
			}
			if (configureAction.action === ConfigureAction.UPDATE) {
				// eslint-disable-next-line no-await-in-loop
				await this.updateIdentityProvider(configureAction.config);
				count += 1;
			}
			if (configureAction.action === ConfigureAction.DELETE) {
				// eslint-disable-next-line no-await-in-loop
				await this.deleteIdentityProvider(configureAction.alias);
				count += 1;
			}
		}
		return count;
	}

	/**
	 * decides for each system if it needs to be added, updated or deleted in keycloak
	 *
	 * @param newConfigs
	 * @param oldConfigs
	 * @returns
	 */
	private selectConfigureAction(newConfigs: System[], oldConfigs: IdentityProviderRepresentation[]) {
		const result = [] as (
			| { action: ConfigureAction.CREATE; config: IdentityProviderConfig }
			| { action: ConfigureAction.UPDATE; config: IdentityProviderConfig }
			| { action: ConfigureAction.DELETE; alias: string }
		)[];
		// updating or creating configs
		newConfigs.forEach((newConfig) => {
			if (oldConfigs.some((oldConfig) => oldConfig.alias === newConfig.alias)) {
				result.push({ action: ConfigureAction.UPDATE, config: newConfig as IdentityProviderConfig });
			} else {
				result.push({ action: ConfigureAction.CREATE, config: newConfig as IdentityProviderConfig });
			}
		});
		// deleting configs
		oldConfigs.forEach((oldConfig) => {
			if (!newConfigs.some((newConfig) => newConfig.alias === oldConfig.alias)) {
				result.push({ action: ConfigureAction.DELETE, alias: oldConfig.alias as string });
			}
		});
		return result;
	}

	private async createIdentityProvider(system: IdentityProviderConfig): Promise<void> {
		const kc = await this.kcAdmin.callKcAdminClient();
		if (system.type === SysType.OIDC) {
			await kc.identityProviders.create({
				providerId: system.type,
				alias: system.alias,
				enabled: true,
				firstBrokerLoginFlowAlias: flowAlias,
				config: {
					clientId: system.config.clientId,
					clientSecret: system.config.clientSecret,
					authorizationUrl: system.config.authorizationUrl,
					tokenUrl: system.config.tokenUrl,
					logoutUrl: system.config.logoutUrl,
				},
			});
		}
	}

	private async updateIdentityProvider(system: IdentityProviderConfig): Promise<void> {
		const kc = await this.kcAdmin.callKcAdminClient();
		if (system.type === SysType.OIDC) {
			await kc.identityProviders.update(
				{ alias: system.alias },
				{
					providerId: system.type,
					alias: system.alias,
					enabled: true,
					firstBrokerLoginFlowAlias: flowAlias,
					config: {
						clientId: system.config.clientId,
						clientSecret: system.config.clientSecret,
						authorizationUrl: system.config.authorizationUrl,
						tokenUrl: system.config.tokenUrl,
						logoutUrl: system.config.logoutUrl,
					},
				}
			);
		}
	}

	private async loadConfigs(sysTypes: SysType[], loadFromJson = false): Promise<IdentityProviderConfig[]> {
		if (loadFromJson) {
			const data: string = await fs.readFile(this.inputFiles.systemsFile, { encoding: 'utf-8' });
			let systems = JSON.parse(data) as IdentityProviderConfig[];
			systems = systems.filter((system) => sysTypes.includes(system.type as SysType));
			systems.forEach((system) => {
				if (system.type === SysType.OIDC && system.config) {
					const clientId = this.configService.get<string>(system.config.clientId);
					const clientSecret = this.configService.get<string>(system.config.clientSecret);
					if (clientId && clientSecret) {
						system.config.clientId = clientId;
						system.config.clientSecret = clientSecret;
					}
				}
			});
			return systems;
		}
		const systems = (await this.systemRepo.findAll()).filter((system) =>
			sysTypes.includes(system.type as SysType)
		) as IdentityProviderConfig[];
		systems.forEach((system) => {
			if (system.type === SysType.OIDC && system.config) {
				system.config.clientId = this.encryptionService.decrypt(system.config.clientId);
				system.config.clientSecret = this.encryptionService.decrypt(system.config.clientSecret);
			}
		});
		return systems;
	}

	private async deleteIdentityProvider(alias: string): Promise<void> {
		const kc = await this.kcAdmin.callKcAdminClient();
		await kc.identityProviders.del({ alias });
	}
}