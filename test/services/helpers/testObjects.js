const logger = require('../../../src/logger/index');

const serviceHelpers = require('./services');

const warn = (message, pass) => {
	logger.warning(message);
	return pass;
};

module.exports = (app, opt = {
	schoolId: '0000d186816abba584714c5f',
}) => {
	const {
		teams,
		testSystem,
		login,
		classes,
		users,
		consents,
		courses,
		accounts,
		roles,
		schools,
		years,
		schoolGroups,
		datasources,
	} = serviceHelpers(app, opt);

	const cleanup = () => Promise.all([]
		.concat(accounts.cleanup())
		.concat(users.cleanup())
		.concat(consents.cleanup())
		.concat(testSystem.cleanup())
		.concat(classes.cleanup())
		.concat(courses.cleanup())
		.concat(teams.cleanup())
		.concat(roles.cleanup())
		.concat(schools.cleanup())
		.concat(schoolGroups.cleanup())
		.concat(years.cleanup())
		.concat(datasources.cleanup()))
		.then((res) => {
			logger.info('[TestObjects] cleanup data.');
			return res;
		})
		.catch((err) => {
			logger.warning('[TestObjects] Can not cleanup.', err);
			return err;
		});

	const info = () => ({
		teams: teams.info,
		users: users.info,
		testSystem: testSystem.info,
		classes: classes.info,
		tempPins: users.tempPinIds,
		courses: courses.info,
		accounts: accounts.info,
		schools: schools.info,
		schoolGroups: schoolGroups.info,
		years: years.info,
		datasources: datasources.info,
	});

	const createTestTeamWithOwner = async () => {
		const user = await users.create();
		const team = await teams.create(user);
		return { team, user };
	};

	const setupUser = async (userData) => {
		const $user = await users.create(userData);
		const user = $user.toObject();
		const requestParams = await login.generateRequestParamsFromUser(user, true);
		const { account } = requestParams;
		delete requestParams.account;
		// todo add fakeLoginParams 
		return { user, account, requestParams };
	};

	return {
		createTestSystem: testSystem.create,
		createTestAccount: accounts.create,
		createTestUser: users.create,
		createTestConsent: consents.create,
		createTestClass: classes.create,
		createTestCourse: courses.create,
		createTestRole: roles.create,
		createTestSchool: schools.create,
		createTestSchoolGroup: schoolGroups.create,
		createTestDatasource: datasources.create,
		cleanup,
		generateJWT: login.generateJWT,
		generateRequestParams: login.generateRequestParams,
		generateRequestParamsFromUser: login.generateRequestParams,
		// todo update and renname for intern request params?
		fakeLoginParams: warn('@shouldUpdated', login.fakeLoginParams),
		createdUserIds: warn('@deprecated use info() instead', users.info),
		teams,
		createTestTeamWithOwner,
		info,
		setupUser,
		options: opt,
	};
};
