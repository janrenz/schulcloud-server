/* eslint-disable no-process-env */
const { log } = console; // cann't use logger here due to circular imports

const globals = {
	BODYPARSER_JSON_LIMIT: process.env.BODYPARSER_JSON_LIMIT || '20mb',
	DATABASE_AUDIT: process.env.DATABASE_AUDIT || 'false',
	DOCUMENT_BASE_DIR: process.env.DOCUMENT_BASE_DIR || 'https://s3.hidrive.strato.com/schul-cloud-hpi/',
	MAXIMUM_ALLOWABLE_TOTAL_ATTACHMENTS_SIZE_BYTE: (5 * 1024 * 1024), // 5MB
	REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT || 8000,
	METRICS_PATH: process.env.METRICS_PATH || '/metrics',
	MONGOOSE_CONNECTION_POOL_SIZE: parseInt(process.env.MONGOOSE_CONNECTION_POOL_SIZE || '10', 10),
	STUDENT_TEAM_CREATE_DISABLED: process.env.STUDENT_TEAM_CREATE_DISABLED,

	SC_DOMAIN: process.env.SC_DOMAIN || 'localhost',
	SC_THEME: process.env.SC_THEME || 'default',
	SC_TITLE: process.env.SC_TITLE || 'HPI Schul-Cloud',
	SC_SHORT_TITLE: process.env.SC_SHORT_TITLE || 'Schul-Cloud',
	SMTP_SENDER: process.env.SMTP_SENDER || 'noreply@schul-cloud.org',

	KEEP_ALIVE: process.env.KEEP_ALIVE || false,
	/**
	 * default value 'default' replaces 'development' from app.get('env'),
	 * it's used in different filenames
	 */
	NODE_ENV: process.env.NODE_ENV || 'default',
	HOST: process.env.HOST || 'localhost:3030',
	TOKEN_SUB: process.env.TOKEN_SUB
	|| process.env.HOST || 'https://schulcloud-thueringen.de', // added TOKEN_SUB on env
	TOKEN_ISS: process.env.TOKEN_ISS || process.env.SC_DOMAIN || 'schulcloud-thueringen.de', // added TOKEN_ISS on env
	SYSTEM_LOG_LEVEL: process.env.SYSTEM_LOG_LEVEL || 'sendRequests',
	// secrets smtp
	SMTP: process.env.SMTP,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	// secrets aws
	AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
	AWS_REGION: process.env.AWS_REGION || 'eu-de',
	AWS_ENDPOINT_URL: process.env.AWS_ENDPOINT_URL,
	AUTHENTICATION: process.env.AUTHENTICATION,
	//
	DISPLAY_REQUEST_LEVEL: Number(process.env.DISPLAY_REQUEST_LEVEL || 0),
	ANALYTICS_LOGGING: process.env.ANALYTICS_LOGGING,
	LOGIN_BLOCK_TIME: process.env.LOGIN_BLOCK_TIME || 15, // allowedTimeDifference
	CONSENT_WITHOUT_PARENTS_MIN_AGE_YEARS: parseInt(process.env.CONSENT_WITHOUT_PARENTS_MIN_AGE_YEARS || 16, 10),

	/** used in tests only currently */
	OAUTH_URL: process.env.OAUTH_URL,

	// test user helper
	TEST_PW: (process.env.TEST_PW || '').trim(),
	TEST_HASH: (process.env.TEST_HASH || '').trim(),
	AT: '@schul-cloud.org',

	// nbc
	NBC_IMPORTURL: process.env.NBC_IMPORTURL,
	NBC_IMPORTUSER: process.env.NBC_IMPORTUSER,
	NBC_IMPORTPASSWORD: process.env.NBC_IMPORTPASSWORD,

	// files
	FILE_PREVIEW_SERVICE_URI: process.env.FILE_PREVIEW_SERVICE_URI || 'http://localhost:3000/filepreview',
	FILE_PREVIEW_CALLBACK_URI: process.env.FILE_PREVIEW_CALLBACK_URI
	|| 'http://localhost:3030/fileStorage/thumbnail/',
	ENABLE_THUMBNAIL_GENERATION: process.env.ENABLE_THUMBNAIL_GENERATION || false,
	FILE_SECURITY_CHECK_SERVICE_URI: process.env.FILE_SECURITY_CHECK_SERVICE_URI
	|| 'http://localhost:8081/scan/file',
	/** path must start and end with a slash */
	SECURITY_CHECK_SERVICE_PATH: '/fileStorage/securityCheck/',
	/** url must not end with slash */
	API_HOST: process.env.API_HOST || 'http://localhost:3030',
	FILE_SECURITY_CHECK_MAX_FILE_SIZE:
	parseInt(process.env.FILE_SECURITY_CHECK_MAX_FILE_SIZE || '', 10)
	|| 512 * 1024 * 1024,
	FILE_SECURITY_SERVICE_USERNAME: process.env.FILE_SECURITY_SERVICE_USERNAME || '',
	FILE_SECURITY_SERVICE_PASSWORD: process.env.FILE_SECURITY_SERVICE_PASSWORD || '',
	ENABLE_FILE_SECURITY_CHECK: process.env.ENABLE_FILE_SECURITY_CHECK || 'false',
};


// validation /////////////////////////////////////////////////
const environments = ['default', 'test', 'production', 'migration']; // todo move to config
const { NODE_ENV } = globals;
if (!(environments.includes(globals.NODE_ENV))) {
	throw new Error('NODE_ENV must match one of valid environments', { environments, NODE_ENV });
} else {
	log(`NODE_ENV is set to ${globals.NODE_ENV}`);
}


module.exports = globals;
