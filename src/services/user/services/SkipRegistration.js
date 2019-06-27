const { BadRequest, Forbidden } = require('@feathersjs/errors');

const validateRequest = (data, targetUser, actingUser) => {
	// check persmissison
	const targetIsStudent = targetUser.roles[0].name === 'student';
	const targetIsTeacher = targetUser.roles[0].name === 'teacher';
	let hasPermission = false;

	if (targetIsStudent && actingUser.permissions.includes('STUDENT_SKIP_REGISTRATION')) {
		hasPermission = true;
	}
	if (targetIsTeacher && actingUser.permissions.includes('TEACHER_SKIP_REGISTRATION')) {
		hasPermission = true;
	}
	if (!hasPermission) return Promise.reject(new Forbidden('you do not have permission to do this!'));

	// sanitize
	if (!((data.parent_privacyConsent && data.parent_termsOfUseConsent)
		|| (data.privacyConsent && data.termsOfUseConsent))) {
		return Promise.reject(new BadRequest('you have to set valid consents!'));
	}
	if (!data.password) return Promise.reject(new BadRequest('you have to set a password!'));
	if (targetIsStudent && !data.birthday) return Promise.reject(new BadRequest('students require a birtdate'));

	// todo: what status code?
	if (!targetUser.importHash) return Promise.reject(new BadRequest('this user is not viable for registration'));
	return Promise.resolve(true);
};

const createAccount = async function createAccount(data, targetUser, app) {
	const existingAccount = await app.service('accounts').find({ query: { userId: targetUser._id } });
	if (existingAccount.length === 0) {
		app.service('accounts').create({
			userId: targetUser._id,
			password: data.password,
			username: targetUser.email,
			active: true,
		});
	}
	// what in case of SSO users?
	return Promise.resolve();
};

const updateConsent = (data, targetUser, app) => {
	const consent = { userId: targetUser._id };
	if (data.parent_privacyConsent || data.parent_termsOfUseConsent) {
		consent.parentConsents = [{
			form: 'analog',
			privacyConsent: data.parent_privacyConsent,
			termsOfUseConsent: data.parent_termsOfUseConsent,
		}];
	}
	if (data.privacyConsent || data.termsOfUseConsent) {
		consent.userConsent = {
			form: 'analog',
			privacyConsent: data.privacyConsent,
			termsOfUseConsent: data.termsOfUseConsent,
		};
	}
	return app.service('consents').create(consent);
};

const updateUserBirthdate = (data, targetUser, app) => app.service('users').patch({ birthday: data.birthday });

class SkipRegistrationService {
	constructor() {
		this.docs = {};
	}

	async create(data, params) {
		try {
			const targetUser = await this.app.service('users').get(params.route.userid,
				{ query: { $populate: 'roles' } });
			const actingUser = await this.app.service('users').get(params.account.userId);
			await validateRequest(data, targetUser, actingUser);

			await Promise.all([
				createAccount(data, targetUser, this.app),
				updateConsent(data, targetUser, this.app),
				updateUserBirthdate(data, targetUser, this.app),
			]);

			return Promise.resolve('success');
		} catch (err) {
			throw err;
		}
	}

	setup(app) {
		this.app = app;
	}
}

module.exports = SkipRegistrationService;
