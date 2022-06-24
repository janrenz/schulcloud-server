import { MikroORM } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationError, EntityNotFoundError, ForbiddenOperationError, ValidationError } from '@shared/common';
import { AccountService } from '@src/modules/account/services/account.service';
import { AccountDto } from '@src/modules/account/services/dto/account.dto';
import {
	Account,
	EntityId,
	ICurrentUser,
	Permission,
	PermissionService,
	Role,
	RoleName,
	School,
	User,
	SchoolRoles,
	SchoolRolePermission,
} from '@shared/domain';
import { UserRepo } from '@shared/repo';
import { accountFactory, schoolFactory, setupEntities, systemFactory, userFactory } from '@shared/testing';
import { Configuration } from '@hpi-schul-cloud/commons/lib';
import { AccountSaveDto } from '@src/modules/account/services/dto';
import {
	AccountByIdBodyParams,
	AccountByIdParams,
	AccountSearchListResponse,
	AccountSearchQueryParams,
	AccountSearchType,
} from '../controller/dto';
import { AccountEntityToDtoMapper, AccountResponseMapper } from '../mapper';
import { AccountUc } from './account.uc';

describe('AccountUc', () => {
	let module: TestingModule;
	let accountUc: AccountUc;
	let userRepo: UserRepo;
	let accountService: AccountService;
	let orm: MikroORM;

	let mockSchool: School;
	let mockOtherSchool: School;
	let mockSchoolWithStudentVisibility: School;

	let mockSuperheroUser: User;
	let mockAdminUser: User;
	let mockTeacherUser: User;
	let mockOtherTeacherUser: User;
	let mockTeacherNoUserNoSchoolPermissionUser: User;
	let mockTeacherNoUserPermissionUser: User;
	let mockStudentSchoolPermissionUser: User;
	let mockStudentUser: User;
	let mockOtherStudentUser: User;
	let mockDifferentSchoolAdminUser: User;
	let mockDifferentSchoolTeacherUser: User;
	let mockUnknownRoleUser: User;
	let mockExternalUser: User;
	let mockUserWithoutAccount: User;
	let mockUserWithoutRole: User;
	let mockStudentUserWithoutAccount: User;
	let mockOtherStudentSchoolPermissionUser: User;

	let mockSuperheroAccount: Account;
	let mockTeacherAccount: Account;
	let mockOtherTeacherAccount: Account;
	let mockTeacherNoUserPermissionAccount: Account;
	let mockTeacherNoUserNoSchoolPermissionAccount: Account;
	let mockAdminAccount: Account;
	let mockStudentAccount: Account;
	let mockStudentSchoolPermissionAccount: Account;
	let mockDifferentSchoolAdminAccount: Account;
	let mockUnknownRoleUserAccount: Account;
	let mockExternalUserAccount: Account;
	let mockAccountWithoutRole: Account;
	let mockAccountWithoutUser: Account;
	let mockAccounts: Account[];
	let mockUsers: User[];

	const defaultPassword = 'DummyPasswd!1';
	const otherPassword = 'DummyPasswd!2';
	const defaultPasswordHash = '$2a$10$/DsztV5o6P5piW2eWJsxw.4nHovmJGBA.QNwiTmuZ/uvUc40b.Uhu';

	afterAll(async () => {
		await module.close();
		await orm.close();
	});

	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [
				AccountUc,
				{
					provide: AccountService,
					useValue: {
						save: jest.fn().mockImplementation((account: AccountDto): Promise<void> => {
							if (account.username === 'fail@to.update') {
								return Promise.reject();
							}
							const accountEntity = mockAccounts.find(
								(tempAccount) => tempAccount.userId?.toString() === account.userId
							);
							Object.assign(accountEntity, account);

							return Promise.resolve();
						}),
						delete: (account: AccountDto): Promise<AccountDto> => {
							return Promise.resolve(account);
						},
						create: (): Promise<void> => {
							return Promise.resolve();
						},
						findByUserId: (userId: EntityId): Promise<AccountDto | null> => {
							const account = mockAccounts.find((tempAccount) => tempAccount.userId?.toString() === userId);

							if (account) {
								return Promise.resolve(AccountEntityToDtoMapper.mapToDto(account));
							}
							return Promise.resolve(null);
						},
						findByUserIdOrFail: (userId: EntityId): Promise<AccountDto> => {
							const account = mockAccounts.find((tempAccount) => tempAccount.userId?.toString() === userId);

							if (account) {
								return Promise.resolve(AccountEntityToDtoMapper.mapToDto(account));
							}
							if (userId === 'accountWithoutUser') {
								return Promise.resolve(AccountEntityToDtoMapper.mapToDto(mockStudentAccount));
							}
							throw new EntityNotFoundError(Account.name);
						},
						findById: (accountId: EntityId): Promise<AccountDto> => {
							const account = mockAccounts.find((tempAccount) => tempAccount.id === accountId);

							if (account) {
								return Promise.resolve(AccountEntityToDtoMapper.mapToDto(account));
							}
							throw new EntityNotFoundError(Account.name);
						},
						searchByUsernameExactMatch: (username: string): Promise<{ accounts: AccountDto[]; total: number }> => {
							const account = mockAccounts.find((tempAccount) => tempAccount.username === username);

							if (account) {
								return Promise.resolve({ accounts: [AccountEntityToDtoMapper.mapToDto(account)], total: 1 });
							}
							if (username === 'not@available.username') {
								return Promise.resolve({
									accounts: [AccountEntityToDtoMapper.mapToDto(mockExternalUserAccount)],
									total: 1,
								});
								// return Promise.resolve([[mockExternalUserAccount], mockAccounts.length]);
							}
							if (username === 'multiple@account.username') {
								return Promise.resolve({
									accounts: mockAccounts.map((mockAccount) => AccountEntityToDtoMapper.mapToDto(mockAccount)),
									total: mockAccounts.length,
								});
							}
							return Promise.resolve({
								accounts: [],
								total: 0,
							});
						},
						searchByUsernamePartialMatch: (): Promise<{ accounts: AccountDto[]; total: number }> => {
							return Promise.resolve({
								accounts: mockAccounts.map((mockAccount) => AccountEntityToDtoMapper.mapToDto(mockAccount)),
								total: mockAccounts.length,
							});
						},
					},
				},
				{
					provide: UserRepo,
					useValue: {
						findById: (userId: EntityId): Promise<User> => {
							const user = mockUsers.find((tempUser) => tempUser.id === userId);
							if (user) {
								return Promise.resolve(user);
							}
							throw new EntityNotFoundError(User.name);
						},
						findByEmail: (email: string): Promise<User[]> => {
							const user = mockUsers.find((tempUser) => tempUser.email === email);

							if (user) {
								return Promise.resolve([user]);
							}
							if (email === 'not@available.email') {
								return Promise.resolve([mockExternalUser]);
							}
							if (email === 'multiple@user.email') {
								return Promise.resolve(mockUsers);
							}
							return Promise.resolve([]);
						},
						save: jest.fn().mockImplementation((user: User): Promise<void> => {
							if (user.firstName === 'failToUpdate' || user.email === 'user-fail@to.update') {
								return Promise.reject();
							}
							return Promise.resolve();
						}),
					},
				},
				PermissionService,
			],
		}).compile();

		accountUc = module.get(AccountUc);
		userRepo = module.get(UserRepo);
		accountService = module.get(AccountService);
		orm = await setupEntities();
	});

	beforeEach(() => {
		mockSchool = schoolFactory.buildWithId();
		mockOtherSchool = schoolFactory.buildWithId();
		mockSchoolWithStudentVisibility = schoolFactory.buildWithId();
		mockSchoolWithStudentVisibility.permissions = new SchoolRoles();
		mockSchoolWithStudentVisibility.permissions.teacher = new SchoolRolePermission();
		mockSchoolWithStudentVisibility.permissions.teacher.STUDENT_LIST = true;

		mockSuperheroUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [
				new Role({
					name: RoleName.SUPERHERO,
					permissions: [Permission.TEACHER_EDIT, Permission.STUDENT_EDIT],
				}),
			],
		});
		mockAdminUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [
				new Role({
					name: RoleName.ADMINISTRATOR,
					permissions: [
						Permission.TEACHER_EDIT,
						Permission.STUDENT_EDIT,
						Permission.STUDENT_LIST,
						Permission.TEACHER_LIST,
						Permission.TEACHER_CREATE,
						Permission.STUDENT_CREATE,
						Permission.TEACHER_DELETE,
						Permission.STUDENT_DELETE,
					],
				}),
			],
		});
		mockTeacherUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [
				new Role({
					name: RoleName.TEACHER,
					permissions: [Permission.STUDENT_EDIT, Permission.STUDENT_LIST, Permission.TEACHER_LIST],
				}),
			],
		});
		mockOtherTeacherUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [
				new Role({
					name: RoleName.TEACHER,
					permissions: [Permission.STUDENT_EDIT, Permission.STUDENT_LIST, Permission.TEACHER_LIST],
				}),
			],
		});
		mockTeacherNoUserPermissionUser = userFactory.buildWithId({
			school: mockSchoolWithStudentVisibility,
			roles: [
				new Role({
					name: RoleName.TEACHER,
					permissions: [],
				}),
			],
		});
		mockTeacherNoUserNoSchoolPermissionUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [
				new Role({
					name: RoleName.TEACHER,
					permissions: [],
				}),
			],
		});
		mockStudentSchoolPermissionUser = userFactory.buildWithId({
			school: mockSchoolWithStudentVisibility,
			roles: [new Role({ name: RoleName.STUDENT, permissions: [] })],
		});
		mockOtherStudentSchoolPermissionUser = userFactory.buildWithId({
			school: mockSchoolWithStudentVisibility,
			roles: [new Role({ name: RoleName.STUDENT, permissions: [] })],
		});
		mockStudentUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [new Role({ name: RoleName.STUDENT, permissions: [] })],
		});
		mockOtherStudentUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [new Role({ name: RoleName.STUDENT, permissions: [] })],
		});
		mockDifferentSchoolAdminUser = userFactory.buildWithId({
			school: mockOtherSchool,
			roles: [...mockAdminUser.roles],
		});
		mockDifferentSchoolTeacherUser = userFactory.buildWithId({
			school: mockOtherSchool,
			roles: [...mockTeacherUser.roles],
		});
		mockUserWithoutAccount = userFactory.buildWithId({
			school: mockSchool,
			roles: [
				new Role({
					name: RoleName.ADMINISTRATOR,
					permissions: [Permission.TEACHER_EDIT, Permission.STUDENT_EDIT],
				}),
			],
		});
		mockUserWithoutRole = userFactory.buildWithId({
			school: mockSchool,
			roles: [],
		});
		mockUnknownRoleUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [new Role({ name: 'undefinedRole' as RoleName, permissions: ['' as Permission] })],
		});
		mockExternalUser = userFactory.buildWithId({
			school: mockSchool,
			roles: [new Role({ name: RoleName.STUDENT, permissions: [] })],
		});
		mockStudentUserWithoutAccount = userFactory.buildWithId({
			school: mockSchool,
			roles: [new Role({ name: RoleName.STUDENT, permissions: [] })],
		});

		mockSuperheroAccount = accountFactory.buildWithId({
			userId: mockSuperheroUser.id,
			password: defaultPasswordHash,
		});
		mockTeacherAccount = accountFactory.buildWithId({
			userId: mockTeacherUser.id,
			password: defaultPasswordHash,
		});
		mockOtherTeacherAccount = accountFactory.buildWithId({
			userId: mockOtherTeacherUser.id,
			password: defaultPasswordHash,
		});
		mockTeacherNoUserPermissionAccount = accountFactory.buildWithId({
			userId: mockTeacherNoUserPermissionUser.id,
			password: defaultPasswordHash,
		});
		mockTeacherNoUserNoSchoolPermissionAccount = accountFactory.buildWithId({
			userId: mockTeacherNoUserNoSchoolPermissionUser.id,
			password: defaultPasswordHash,
		});
		mockAdminAccount = accountFactory.buildWithId({
			userId: mockAdminUser.id,
			password: defaultPasswordHash,
		});
		mockStudentAccount = accountFactory.buildWithId({
			userId: mockStudentUser.id,
			password: defaultPasswordHash,
		});
		mockStudentSchoolPermissionAccount = accountFactory.buildWithId({
			userId: mockStudentSchoolPermissionUser.id,
			password: defaultPasswordHash,
		});
		mockAccountWithoutRole = accountFactory.buildWithId({
			userId: mockUserWithoutRole.id,
			password: defaultPasswordHash,
		});
		mockDifferentSchoolAdminAccount = accountFactory.buildWithId({
			userId: mockDifferentSchoolAdminUser.id,
			password: defaultPasswordHash,
		});
		mockUnknownRoleUserAccount = accountFactory.buildWithId({
			userId: mockUnknownRoleUser.id,
			password: defaultPasswordHash,
		});
		mockExternalUserAccount = accountFactory.buildWithId({
			userId: mockExternalUser.id,
			password: defaultPasswordHash,
			systemId: systemFactory.buildWithId().id,
		});
		mockExternalUserAccount = accountFactory.buildWithId({
			userId: mockExternalUser.id,
			password: defaultPasswordHash,
			systemId: systemFactory.buildWithId().id,
		});
		mockAccountWithoutUser = accountFactory.buildWithId({
			userId: undefined,
			password: defaultPasswordHash,
			systemId: systemFactory.buildWithId().id,
		});

		mockUsers = [
			mockSuperheroUser,
			mockAdminUser,
			mockTeacherUser,
			mockOtherTeacherUser,
			mockTeacherNoUserPermissionUser,
			mockTeacherNoUserNoSchoolPermissionUser,
			mockStudentUser,
			mockStudentSchoolPermissionUser,
			mockDifferentSchoolAdminUser,
			mockUnknownRoleUser,
			mockExternalUser,
			mockUserWithoutRole,
			mockUserWithoutAccount,
			mockStudentUserWithoutAccount,
			mockOtherStudentUser,
			mockOtherStudentSchoolPermissionUser,
		];

		mockAccounts = [
			mockSuperheroAccount,
			mockAdminAccount,
			mockTeacherAccount,
			mockOtherTeacherAccount,
			mockTeacherNoUserPermissionAccount,
			mockTeacherNoUserNoSchoolPermissionAccount,
			mockStudentAccount,
			mockStudentSchoolPermissionAccount,
			mockDifferentSchoolAdminAccount,
			mockUnknownRoleUserAccount,
			mockExternalUserAccount,
			mockAccountWithoutRole,
			mockAccountWithoutUser,
		];
	});

	describe('updateMyAccount', () => {
		it('should throw if user does not exist', async () => {
			mockStudentUser.forcePasswordChange = true;
			mockStudentUser.preferences = { firstLogin: true };
			await expect(accountUc.updateMyAccount('accountWithoutUser', { passwordOld: defaultPassword })).rejects.toThrow(
				EntityNotFoundError
			);
		});
		it('should throw if account does not exist', async () => {
			await expect(
				accountUc.updateMyAccount(mockUserWithoutAccount.id, {
					passwordOld: defaultPassword,
				})
			).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if account is external', async () => {
			await expect(
				accountUc.updateMyAccount(mockExternalUserAccount.userId?.toString() ?? '', {
					passwordOld: defaultPassword,
				})
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw if password does not match', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: 'DoesNotMatch',
				})
			).rejects.toThrow(AuthorizationError);
		});
		it('should throw if changing own name is not allowed', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					firstName: 'newFirstName',
				})
			).rejects.toThrow(ForbiddenOperationError);
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					lastName: 'newLastName',
				})
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should allow to update email', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: 'an@available.mail',
				})
			).resolves.not.toThrow();
		});
		it('should use email as account user name in lower case', async () => {
			const accountSaveSpy = jest.spyOn(accountService, 'save');
			const testMail = 'AN@AVAILABLE.MAIL';
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: testMail,
				})
			).resolves.not.toThrow();
			expect(accountSaveSpy).toBeCalledWith(expect.objectContaining({ username: testMail.toLowerCase() }));
		});
		it('should use email as user email in lower case', async () => {
			const userUpdateSpy = jest.spyOn(userRepo, 'save');
			const testMail = 'AN@AVAILABLE.MAIL';
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: testMail,
				})
			).resolves.not.toThrow();
			expect(userUpdateSpy).toBeCalledWith(expect.objectContaining({ email: testMail.toLowerCase() }));
		});
		it('should always update account user name AND user email together.', async () => {
			const accountSaveSpy = jest.spyOn(accountService, 'save');
			const userUpdateSpy = jest.spyOn(userRepo, 'save');
			const testMail = 'an@available.mail';
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: testMail,
				})
			).resolves.not.toThrow();
			expect(userUpdateSpy).toBeCalledWith(expect.objectContaining({ email: testMail.toLowerCase() }));
			expect(accountSaveSpy).toBeCalledWith(expect.objectContaining({ username: testMail.toLowerCase() }));
		});
		it('should throw if new email already in use', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: mockAdminUser.email,
				})
			).rejects.toThrow(ValidationError);
			// other criteria branching
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: 'multiple@user.email',
				})
			).rejects.toThrow(ValidationError);
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: 'multiple@account.username',
				})
			).rejects.toThrow(ValidationError);
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: 'not@available.email',
				})
			).rejects.toThrow(ValidationError);
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: 'not@available.username',
				})
			).rejects.toThrow(ValidationError);
		});
		it('should throw if new email already in use ignore case', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: mockAdminUser.email.toUpperCase(),
				})
			).rejects.toThrow(ValidationError);
		});
		it('should allow to update with strong password', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					passwordNew: otherPassword,
				})
			).resolves.not.toThrow();
		});
		it('should allow to update first and last name if teacher', async () => {
			await expect(
				accountUc.updateMyAccount(mockTeacherUser.id, {
					passwordOld: defaultPassword,
					firstName: 'newFirstName',
				})
			).resolves.not.toThrow();
			await expect(
				accountUc.updateMyAccount(mockTeacherUser.id, {
					passwordOld: defaultPassword,
					lastName: 'newLastName',
				})
			).resolves.not.toThrow();
		});
		it('should allow to update first and last name if admin', async () => {
			await expect(
				accountUc.updateMyAccount(mockAdminUser.id, {
					passwordOld: defaultPassword,
					firstName: 'newFirstName',
				})
			).resolves.not.toThrow();
			await expect(
				accountUc.updateMyAccount(mockAdminUser.id, {
					passwordOld: defaultPassword,
					lastName: 'newLastName',
				})
			).resolves.not.toThrow();
		});
		it('should allow to update first and last name if superhero', async () => {
			await expect(
				accountUc.updateMyAccount(mockSuperheroUser.id, {
					passwordOld: defaultPassword,
					firstName: 'newFirstName',
				})
			).resolves.not.toThrow();
			await expect(
				accountUc.updateMyAccount(mockSuperheroUser.id, {
					passwordOld: defaultPassword,
					lastName: 'newLastName',
				})
			).resolves.not.toThrow();
		});
		it('should throw if user can not be updated', async () => {
			await expect(
				accountUc.updateMyAccount(mockTeacherUser.id, {
					passwordOld: defaultPassword,
					firstName: 'failToUpdate',
				})
			).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if account can not be updated', async () => {
			await expect(
				accountUc.updateMyAccount(mockStudentUser.id, {
					passwordOld: defaultPassword,
					email: 'fail@to.update',
				})
			).rejects.toThrow(EntityNotFoundError);
		});
	});

	describe('replaceMyTemporaryPassword', () => {
		it('should throw if passwords do not match', async () => {
			await expect(
				accountUc.replaceMyTemporaryPassword(
					mockStudentAccount.userId?.toString() ?? '',
					defaultPassword,
					'FooPasswd!1'
				)
			).rejects.toThrow(ForbiddenOperationError);
		});

		it('should throw if account does not exist', async () => {
			await expect(
				accountUc.replaceMyTemporaryPassword(mockUserWithoutAccount.id, defaultPassword, defaultPassword)
			).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if user does not exist', async () => {
			await expect(
				accountUc.replaceMyTemporaryPassword('accountWithoutUser', defaultPassword, defaultPassword)
			).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if account is external', async () => {
			await expect(
				accountUc.replaceMyTemporaryPassword(
					mockExternalUserAccount.userId?.toString() ?? '',
					defaultPassword,
					defaultPassword
				)
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw if not the users password is temporary', async () => {
			mockStudentUser.forcePasswordChange = false;
			mockStudentUser.preferences = { firstLogin: true };
			await expect(
				accountUc.replaceMyTemporaryPassword(
					mockStudentAccount.userId?.toString() ?? '',
					defaultPassword,
					defaultPassword
				)
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw, if old password is the same as new password', async () => {
			mockStudentUser.forcePasswordChange = false;
			mockStudentUser.preferences = { firstLogin: false };
			await expect(
				accountUc.replaceMyTemporaryPassword(
					mockStudentAccount.userId?.toString() ?? '',
					defaultPassword,
					defaultPassword
				)
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw, if old password is undefined', async () => {
			mockStudentUser.forcePasswordChange = false;
			mockStudentUser.preferences = { firstLogin: false };
			mockStudentAccount.password = undefined;
			await expect(
				accountUc.replaceMyTemporaryPassword(
					mockStudentAccount.userId?.toString() ?? '',
					defaultPassword,
					defaultPassword
				)
			).rejects.toThrow(Error);
		});
		it('should allow to set strong password, if the admin manipulated the users password', async () => {
			mockStudentUser.forcePasswordChange = true;
			mockStudentUser.preferences = { firstLogin: true };
			await expect(
				accountUc.replaceMyTemporaryPassword(mockStudentAccount.userId?.toString() ?? '', otherPassword, otherPassword)
			).resolves.not.toThrow();
		});
		it('should allow to set strong password, if this is the users first login', async () => {
			mockStudentUser.forcePasswordChange = false;
			mockStudentUser.preferences = { firstLogin: false };
			await expect(
				accountUc.replaceMyTemporaryPassword(mockStudentAccount.userId?.toString() ?? '', otherPassword, otherPassword)
			).resolves.not.toThrow();
		});
		it('should throw if user can not be updated', async () => {
			mockStudentUser.forcePasswordChange = false;
			mockStudentUser.preferences = { firstLogin: false };
			mockStudentUser.firstName = 'failToUpdate';
			await expect(
				accountUc.replaceMyTemporaryPassword(mockStudentAccount.userId?.toString() ?? '', otherPassword, otherPassword)
			).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if account can not be updated', async () => {
			mockStudentUser.forcePasswordChange = false;
			mockStudentUser.preferences = { firstLogin: false };
			mockStudentAccount.username = 'fail@to.update';
			await expect(
				accountUc.replaceMyTemporaryPassword(mockStudentAccount.userId?.toString() ?? '', otherPassword, otherPassword)
			).rejects.toThrow(EntityNotFoundError);
		});
	});

	describe('searchAccounts', () => {
		it('should return one account, if search type is userId', async () => {
			const accounts = await accountUc.searchAccounts(
				{ userId: mockSuperheroUser.id } as ICurrentUser,
				{ type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams
			);
			const expected = new AccountSearchListResponse(
				[AccountResponseMapper.mapToResponseFromEntity(mockStudentAccount)],
				1,
				0,
				1
			);
			expect(accounts).toStrictEqual<AccountSearchListResponse>(expected);
		});
		it('should return empty list, if account is not found', async () => {
			const accounts = await accountUc.searchAccounts(
				{ userId: mockSuperheroUser.id } as ICurrentUser,
				{ type: AccountSearchType.USER_ID, value: mockUserWithoutAccount.id } as AccountSearchQueryParams
			);
			const expected = new AccountSearchListResponse([], 0, 0, 0);
			expect(accounts).toStrictEqual<AccountSearchListResponse>(expected);
		});
		it('should return one or more accounts, if search type is username', async () => {
			const accounts = await accountUc.searchAccounts(
				{ userId: mockSuperheroUser.id } as ICurrentUser,
				{ type: AccountSearchType.USERNAME, value: '' } as AccountSearchQueryParams
			);
			expect(accounts.skip).toEqual(0);
			expect(accounts.limit).toEqual(10);
			expect(accounts.total).toBeGreaterThan(1);
			expect(accounts.data.length).toBeGreaterThan(1);
		});
		it('should throw, if user has not the right permissions', async () => {
			await expect(
				accountUc.searchAccounts(
					{ userId: mockTeacherUser.id } as ICurrentUser,
					{ type: AccountSearchType.USER_ID, value: mockAdminUser.id } as AccountSearchQueryParams
				)
			).rejects.toThrow(ForbiddenOperationError);

			await expect(
				accountUc.searchAccounts(
					{ userId: mockStudentUser.id } as ICurrentUser,
					{ type: AccountSearchType.USER_ID, value: mockOtherStudentUser.id } as AccountSearchQueryParams
				)
			).rejects.toThrow(ForbiddenOperationError);

			await expect(
				accountUc.searchAccounts(
					{ userId: mockStudentUser.id } as ICurrentUser,
					{ type: AccountSearchType.USER_ID, value: mockTeacherUser.id } as AccountSearchQueryParams
				)
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw, if search type is unknown', async () => {
			await expect(
				accountUc.searchAccounts(
					{ userId: mockSuperheroUser.id } as ICurrentUser,
					{ type: '' as AccountSearchType } as AccountSearchQueryParams
				)
			).rejects.toThrow('Invalid search type.');
		});
		it('should throw, if user is no superhero', async () => {
			await expect(
				accountUc.searchAccounts(
					{ userId: mockTeacherUser.id } as ICurrentUser,
					{ type: AccountSearchType.USERNAME, value: mockStudentUser.id } as AccountSearchQueryParams
				)
			).rejects.toThrow(ForbiddenOperationError);
		});

		describe('hasPermissionsToAccessAccount', () => {
			it('admin can access teacher of the same school via user id', async () => {
				const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockTeacherUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();
			});
			it('admin can access student of the same school via user id', async () => {
				const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();
			});
			it('admin can not access admin of the same school via user id', async () => {
				const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockAdminUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();
			});
			it('admin can not access any account of a foreign school via user id', async () => {
				const currentUser = { userId: mockDifferentSchoolAdminUser.id } as ICurrentUser;

				let params = { type: AccountSearchType.USER_ID, value: mockTeacherUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();

				params = { type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();
			});
			it('teacher can access teacher of the same school via user id', async () => {
				const currentUser = { userId: mockTeacherUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockOtherTeacherUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();
			});
			it('teacher can access student of the same school via user id', async () => {
				const currentUser = { userId: mockTeacherUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();
			});
			it('teacher can not access admin of the same school via user id', async () => {
				const currentUser = { userId: mockTeacherUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockAdminUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();
			});
			it('teacher can not access any account of a foreign school via user id', async () => {
				const currentUser = { userId: mockDifferentSchoolTeacherUser.id } as ICurrentUser;

				let params = { type: AccountSearchType.USER_ID, value: mockTeacherUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();

				params = { type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();
			});
			it('teacher can access student of the same school via user id if school has global permission', async () => {
				const configSpy = jest.spyOn(Configuration, 'get').mockReturnValue(true);
				const currentUser = { userId: mockTeacherNoUserPermissionUser.id } as ICurrentUser;
				const params = {
					type: AccountSearchType.USER_ID,
					value: mockStudentSchoolPermissionUser.id,
				} as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();
				configSpy.mockRestore();
			});
			it('teacher can not access student of the same school if school has no global permission', async () => {
				const configSpy = jest.spyOn(Configuration, 'get').mockReturnValue(true);
				const currentUser = { userId: mockTeacherNoUserNoSchoolPermissionUser.id } as ICurrentUser;
				const params = { type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow(ForbiddenOperationError);
				configSpy.mockRestore();
			});

			it('student can not access student of the same school if school has global permission', async () => {
				const configSpy = jest.spyOn(Configuration, 'get').mockReturnValue(true);
				const currentUser = { userId: mockStudentSchoolPermissionUser.id } as ICurrentUser;
				const params = {
					type: AccountSearchType.USER_ID,
					value: mockOtherStudentSchoolPermissionUser.id,
				} as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow(ForbiddenOperationError);
				configSpy.mockRestore();
			});
			it('student can not access any other account via user id', async () => {
				const currentUser = { userId: mockStudentUser.id } as ICurrentUser;

				let params = { type: AccountSearchType.USER_ID, value: mockAdminUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();

				params = { type: AccountSearchType.USER_ID, value: mockTeacherUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();

				params = { type: AccountSearchType.USER_ID, value: mockStudentUser.id } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).rejects.toThrow();
			});
			it('superhero can access any account via username', async () => {
				const currentUser = { userId: mockSuperheroUser.id } as ICurrentUser;

				let params = { type: AccountSearchType.USERNAME, value: mockAdminAccount.username } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();

				params = { type: AccountSearchType.USERNAME, value: mockTeacherAccount.username } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();

				params = { type: AccountSearchType.USERNAME, value: mockStudentAccount.username } as AccountSearchQueryParams;
				await expect(accountUc.searchAccounts(currentUser, params)).resolves.not.toThrow();
			});
		});
	});

	describe('findAccountById', () => {
		it('should return an account, if the current user is a superhero', async () => {
			const account = await accountUc.findAccountById(
				{ userId: mockSuperheroUser.id } as ICurrentUser,
				{ id: mockStudentAccount.id } as AccountByIdParams
			);
			expect(account).toStrictEqual(
				expect.objectContaining({
					id: mockStudentAccount.id,
					username: mockStudentAccount.username,
					userId: mockStudentUser.id,
					activated: mockStudentAccount.activated,
				})
			);
		});
		it('should throw, if the current user is no superhero', async () => {
			await expect(
				accountUc.findAccountById(
					{ userId: mockTeacherUser.id } as ICurrentUser,
					{ id: mockStudentAccount.id } as AccountByIdParams
				)
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw, if no account matches the search term', async () => {
			await expect(
				accountUc.findAccountById({ userId: mockSuperheroUser.id } as ICurrentUser, { id: 'xxx' } as AccountByIdParams)
			).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw, if target account has no user', async () => {
			await expect(
				accountUc.findAccountById({ userId: mockSuperheroUser.id } as ICurrentUser, { id: 'xxx' } as AccountByIdParams)
			).rejects.toThrow(EntityNotFoundError);
		});
	});

	describe('saveAccount', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should sanitize username for local user', async () => {
			const spy = jest.spyOn(accountService, 'save');
			const params: AccountSaveDto = {
				username: ' John.Doe@domain.tld ',
			};
			await accountUc.saveAccount(params);
			expect(spy).toHaveBeenCalledWith({
				username: 'john.doe@domain.tld',
			});
		});
		it('should not sanitize username for external user', async () => {
			const spy = jest.spyOn(accountService, 'save');
			const params: AccountSaveDto = {
				username: ' John.Doe@domain.tld ',
				systemId: 'ABC123',
			};
			await accountUc.saveAccount(params);
			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					username: ' John.Doe@domain.tld ',
				})
			);
		});
		it('should throw if username for a local user is not an email', async () => {
			const params: AccountSaveDto = {
				username: 'John Doe',
			};
			await expect(accountUc.saveAccount(params)).rejects.toThrow('Username is not an email');
		});
		it('should not throw if username for an external user is not an email', async () => {
			const params: AccountSaveDto = {
				username: 'John Doe',
				systemId: 'ABC123',
			};
			await expect(accountUc.saveAccount(params)).resolves.not.toThrow();
		});
		it('should throw if account already exists', async () => {
			const params: AccountSaveDto = {
				username: mockStudentUser.email,
				userId: mockStudentUser.id,
			};
			await expect(accountUc.saveAccount(params)).rejects.toThrow('Account already exists');
		});
		it('should throw if username already exists', async () => {
			mockStudentAccount.username = 'john.doe@domain.tld';
			const params: AccountSaveDto = {
				username: mockStudentAccount.username,
			};
			await expect(accountUc.saveAccount(params)).rejects.toThrow('Username already exists');
		});
	});

	describe('updateAccountById', () => {
		it('should throw if executing user does not exist', async () => {
			const currentUser = { userId: '000000000000000' } as ICurrentUser;
			const params = { id: mockStudentAccount.id } as AccountByIdParams;
			const body = {} as AccountByIdBodyParams;
			await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if target account does not exist', async () => {
			const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
			const params = { id: '000000000000000' } as AccountByIdParams;
			const body = {} as AccountByIdBodyParams;
			await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(EntityNotFoundError);
		});
		it('should update target account password', async () => {
			const previousPasswordHash = mockStudentAccount.password;
			const currentUser = { userId: mockSuperheroUser.id } as ICurrentUser;
			const params = { id: mockStudentAccount.id } as AccountByIdParams;
			const body = { password: defaultPassword } as AccountByIdBodyParams;
			expect(mockStudentUser.forcePasswordChange).toBeFalsy();
			await accountUc.updateAccountById(currentUser, params, body);
			expect(mockStudentAccount.password).not.toBe(previousPasswordHash);
			expect(mockStudentUser.forcePasswordChange).toBeTruthy();
		});
		it('should update target account username', async () => {
			const newUsername = 'newUsername';
			const currentUser = { userId: mockSuperheroUser.id } as ICurrentUser;
			const params = { id: mockStudentAccount.id } as AccountByIdParams;
			const body = { username: newUsername } as AccountByIdBodyParams;
			expect(mockStudentAccount.username).not.toBe(newUsername);
			await accountUc.updateAccountById(currentUser, params, body);
			expect(mockStudentAccount.username).toBe(newUsername.toLowerCase());
		});
		it('should update target account activation state', async () => {
			const currentUser = { userId: mockSuperheroUser.id } as ICurrentUser;
			const params = { id: mockStudentAccount.id } as AccountByIdParams;
			const body = { activated: false } as AccountByIdBodyParams;
			await accountUc.updateAccountById(currentUser, params, body);
			expect(mockStudentAccount.activated).toBeFalsy();
		});
		it('should throw if account can not be updated', async () => {
			const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
			const params = { id: mockStudentAccount.id } as AccountByIdParams;
			const body = { username: 'fail@to.update' } as AccountByIdBodyParams;
			await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if user can not be updated', async () => {
			const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
			const params = { id: mockStudentAccount.id } as AccountByIdParams;
			const body = { username: 'user-fail@to.update' } as AccountByIdBodyParams;
			await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(EntityNotFoundError);
		});
		it('should throw if target account has no user', async () => {
			await expect(
				accountUc.updateAccountById(
					{ userId: mockSuperheroUser.id } as ICurrentUser,
					{ id: mockAccountWithoutUser.id } as AccountByIdParams,
					{ username: 'user-fail@to.update' } as AccountByIdBodyParams
				)
			).rejects.toThrow(EntityNotFoundError);
		});

		describe('hasPermissionsToUpdateAccount', () => {
			it('admin can edit teacher', async () => {
				const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
				const params = { id: mockTeacherAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).resolves.not.toThrow();
			});
			it('teacher can edit student', async () => {
				const currentUser = { userId: mockTeacherUser.id } as ICurrentUser;
				const params = { id: mockStudentAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).resolves.not.toThrow();
			});
			it('admin can edit student', async () => {
				const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
				const params = { id: mockStudentAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).resolves.not.toThrow();
			});
			it('teacher cannot edit other teacher', async () => {
				const currentUser = { userId: mockTeacherUser.id } as ICurrentUser;
				const params = { id: mockOtherTeacherAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(ForbiddenOperationError);
			});
			it("other school's admin cannot edit teacher", async () => {
				const currentUser = { userId: mockDifferentSchoolAdminUser.id } as ICurrentUser;
				const params = { id: mockTeacherAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(ForbiddenOperationError);
			});
			it('superhero can edit admin', async () => {
				const currentUser = { userId: mockSuperheroUser.id } as ICurrentUser;
				const params = { id: mockAdminAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).resolves.not.toThrow();
			});
			it('undefined user role fails by default', async () => {
				const currentUser = { userId: mockUnknownRoleUser.id } as ICurrentUser;
				const params = { id: mockAccountWithoutRole.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(ForbiddenOperationError);
			});
			it('user without role cannot be edited', async () => {
				const currentUser = { userId: mockAdminUser.id } as ICurrentUser;
				const params = { id: mockUnknownRoleUserAccount.id } as AccountByIdParams;
				const body = {} as AccountByIdBodyParams;
				await expect(accountUc.updateAccountById(currentUser, params, body)).rejects.toThrow(ForbiddenOperationError);
			});
		});
	});

	describe('deleteAccountById', () => {
		it('should delete an account, if current user is authorized', async () => {
			await expect(
				accountUc.deleteAccountById(
					{ userId: mockSuperheroUser.id } as ICurrentUser,
					{ id: mockStudentAccount.id } as AccountByIdParams
				)
			).resolves.not.toThrow();
		});
		it('should throw, if the current user is no superhero', async () => {
			await expect(
				accountUc.deleteAccountById(
					{ userId: mockAdminUser.id } as ICurrentUser,
					{ id: mockStudentAccount.id } as AccountByIdParams
				)
			).rejects.toThrow(ForbiddenOperationError);
		});
		it('should throw, if no account matches the search term', async () => {
			await expect(
				accountUc.deleteAccountById(
					{ userId: mockSuperheroUser.id } as ICurrentUser,
					{ id: 'xxx' } as AccountByIdParams
				)
			).rejects.toThrow(EntityNotFoundError);
		});
	});
});