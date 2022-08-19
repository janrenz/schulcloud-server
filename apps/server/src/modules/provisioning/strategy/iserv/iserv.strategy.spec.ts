import { SystemProvisioningStrategy } from '@shared/domain/interface/system-provisioning.strategy';
import { IservProvisioningStrategy } from '@src/modules/provisioning/strategy/iserv/iserv.strategy';
import { UUID } from 'bson';
import { OAuthSSOError } from '@src/modules/oauth/error/oauth-sso.error';
import jwt, { DecodeOptions, JwtPayload } from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';

const params = {
	idToken: 'iservIdToken',
};

describe('IservStrategy', () => {
	let module: TestingModule;
	let iservStrategy: IservProvisioningStrategy;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [IservProvisioningStrategy],
		}).compile();
		iservStrategy = module.get(IservProvisioningStrategy);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	describe('apply', () => {
		const userUUID: UUID = new UUID();

		beforeAll(() => {
			jest.spyOn(jwt, 'decode').mockImplementation(() => {
				return { uuid: userUUID };
			});
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should apply strategy', async () => {
			// Act
			const result = await iservStrategy.apply(params);

			// Assert
			expect(result.externalUserId).toEqual(userUUID);
		});

		it('should throw error when there is no uuid in the idToken', async () => {
			// Arrange
			jest.spyOn(jwt, 'decode').mockImplementationOnce(() => {
				return {};
			});
			// Act & Assert
			await expect(iservStrategy.apply(params)).rejects.toThrow(OAuthSSOError);
		});

		it('should throw error when there is no idToken', async () => {
			// Arrange
			jest.spyOn(jwt, 'decode').mockImplementationOnce(() => {
				return null;
			});
			// Act & Assert
			await expect(iservStrategy.apply(params)).rejects.toThrow(OAuthSSOError);
		});
	});

	describe('getType', () => {
		it('should return type SANIS', () => {
			const retType: SystemProvisioningStrategy = iservStrategy.getType();
			expect(retType).toEqual(SystemProvisioningStrategy.ISERV);
		});
	});
});
