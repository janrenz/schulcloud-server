const accountsHelper = require('./accounts');

const userdata = (user, account) => {
	return {
		accountId: account.id ? account.id : account.id,
		systemId: account.systemId,
		userId: user._id,
		schoolId: user.schoolId,
		roles: user.roles,
	};
};

const getpayload = (user, account) => {
	const currentTime = Math.floor(Date.now() / 1000);
	const dataFromUser = userdata(user, account);
	const expirsIn = currentTime + 3600;
	return {
		accountId: dataFromUser.accountId,
		systemId: dataFromUser.systemId,
		userId: dataFromUser.userId,
		schoolId: dataFromUser.schoolId,
		roles: dataFromUser.roles,
		iat: currentTime,
		sub: dataFromUser.accountId,
	};
};

const generateJWT =
	(appPromise) =>
	async ({ username, password }) => {
		const app = await appPromise;

		const { accounts } = await app.service('nest-account-service').searchByUsernameExactMatch(username);
		const user = await app.service('usersModel').get({
			_id: accounts[0].userId,
		});
		const token = await app.service('authentication').createAccessToken(getpayload(user, accounts[0]));
		return token;
	};

/**
 * Execute login with username and password
 * @returns { authentication = {accessToken, strategy}, provider = 'rest' }
 */
const generateRequestParams =
	(appPromise) =>
	async ({ username, password }) => {
		const app = await appPromise;
		const fetchJwt = generateJWT(app);
		const jwt = await fetchJwt({ username, password });
		return {
			authentication: {
				accessToken: jwt,
				strategy: 'jwt',
			},
			provider: 'rest',
		};
	};

/**
 * I ) Create a account for this user
 * II) Execute login for this user to get the jwt
 * @param {User} user
 * @param {Boolean} withAccount if true the account is also return
 * @returns { [account], authentication = {accessToken, strategy}, provider = 'rest' }
 */
const generateRequestParamsFromUser = (appPromise) => async (user) => {
	const app = await appPromise;
	const credentials = { username: user.email, password: user.email };
	const account = await accountsHelper(app).create(credentials, 'local', user);

	const requestParams = await generateRequestParams(app)(credentials);
	requestParams.account = account;
	return requestParams;
};

const generateJWTFromUser = (appPromise) => async (user) => {
	const app = await appPromise;
	const credentials = { username: user.email, password: user.email };
	await accountsHelper(app).create(credentials, 'local', user);

	const fetchJwt = generateJWT(app);
	const jwt = await fetchJwt(credentials);
	return jwt;
};

module.exports = (app) => ({
	generateJWT: generateJWT(app),
	generateRequestParams: generateRequestParams(app),
	generateRequestParamsFromUser: generateRequestParamsFromUser(app),
	generateJWTFromUser: generateJWTFromUser(app),
});
