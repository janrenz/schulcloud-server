const Sentry = require('@sentry/node');
const { sha } = require('../helper/version');
const { version } = require('../../package.json');

/**
 * helpers
 */
const replaceIds = (string) => {
	if (string) {
		return string.replace(/[a-f\d]{24}/ig, '[id]');
	}
	return string;
};

/**
 * Middlewares
 * @param {SentryEvent} event
 * @param {Object(event_id, originalException, syntheticException)} hint
 * @param {FeatherApp} app
 * @returns {SentryEvent || null} Return modified sentry event, or undefined to skip sending event
 */
const removeIdMiddleware = (event) => {
	// eslint-disable-next-line camelcase
	const { request: { data, url, query_string } } = event;

	event.request.data = replaceIds(data);
	event.request.url = replaceIds(url);
	event.request.query_string = replaceIds(query_string);
	return event;
};

const removeJwtToken = (event) => {
	delete event.request.headers.authorization;
	return event;
};

const logItMiddleware = (sendToSentry = false) => (event, hint, app) => {
	app.logger.info(
		'If you not in development mode, the error is send on this point to sentry! '
		+ 'Please note if you want to test if message is go to sentry modified sendToSentry',
	);
	return sendToSentry ? event : null;
};

const filterByErrorCodesMiddleware = (...errorCode) => (event, hint, app) => {
	const code = hint.originalException.code || hint.originalException.statusCode;
	if (errorCode.includes(code)) {
		return null;
	}
	return event;
};

const filterByErrorMessageMiddleware = (...errorMessage) => (event, hint, app) => {
	if (errorMessage.includes(hint.originalException.message)) {
		return null;
	}
	return event;
};

const skipItMiddleware = () => null;

module.exports = (app) => {
	const dsn = process.env.SENTRY_DSN;
	const environment = app.get('env');
	const release = version;

	if (dsn) {
		// middleware to modified events that, are post to sentry
		let middleware = [
			filterByErrorCodesMiddleware(404),
			filterByErrorMessageMiddleware('could not initialize rocketchat user'),
			removeIdMiddleware,
			removeJwtToken,
		];
		// for local test runs, post feedback but skip it
		if (environment === 'development') {
			middleware.push(logItMiddleware(false));
		}
		// do not execute for test runs
		if (environment === 'test') {
			middleware = [skipItMiddleware];
		}

		const runMiddlewares = (event, hint, index = 0) => {
			if (event === undefined) {
				return undefined;
			}

			if (middleware.length === index) {
				return event;
			}

			const modifiedEvent = middleware[index](event, hint, app);
			return runMiddlewares(modifiedEvent, hint, index + 1);
		};

		Sentry.init({
			dsn,
			environment,
			release,
			//	debug: true,
			sampleRate: 1.0,
			//	captureUnhandledRejections: true,
			// remove is great performance improve if it is not used, but it do not catch errors outside of requests
			/* integrations: [
				new Sentry.Integrations.Console({
					dsn,
				}),
			], */
			beforeSend(event, hint) {
				const modifiedEvent = runMiddlewares(event, hint);
				return modifiedEvent;
			},
		});

		Sentry.configureScope((scope) => {
			scope.setTag('frontend', false);
			scope.setLevel('warning');
			scope.setTag('domain', process.env.SC_DOMAIN || 'localhost');
			scope.setTag('sha', sha);
		});

		app.use(Sentry.Handlers.requestHandler());
	}
};
