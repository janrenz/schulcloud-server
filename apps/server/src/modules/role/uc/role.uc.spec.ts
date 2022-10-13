import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '@src/modules/role/service/role.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { RoleName } from '@shared/domain';
import { RoleUc } from '@src/modules/role/uc/role.uc';
import { RoleDto } from '@src/modules/role/service/dto/role.dto';

describe('RoleUc', () => {
	let module: TestingModule;
	let roleUc: RoleUc;
	let roleService: DeepMocked<RoleService>;
	let roleDto: RoleDto;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [
				RoleUc,
				{
					provide: RoleService,
					useValue: createMock<RoleService>(),
				},
			],
		}).compile();
		roleService = module.get(RoleService);
		roleUc = module.get(RoleUc);
	});

	beforeEach(() => {
		roleDto = new RoleDto({
			id: '',
			name: RoleName.STUDENT,
			permissions: [],
		});
	});

	describe('findByNames', () => {
		it('should find role dtos', async () => {
			// Arrange
			roleService.findByNames.mockResolvedValue([roleDto]);

			// Act
			const resultRoles: RoleDto[] = await roleUc.findByNames([RoleName.STUDENT]);

			// Assert
			expect(resultRoles).toEqual([roleDto]);
			expect(roleService.findByNames).toHaveBeenCalledWith([RoleName.STUDENT]);
		});
	});
});