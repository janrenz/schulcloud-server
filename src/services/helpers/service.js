const request = require('request-promise-native');
const { Unavailable } = require('@feathersjs/errors');
const logger = require('../../logger');

const {
	FORCE_SEND_EMAIL,
	NOTIFICATION_PLATFORM,
	REQUEST_TIMEOUT,
	SMTP_SENDER,
} = require('../../../config/globals');

if (!NOTIFICATION_PLATFORM) {
	throw new Error('Required Env NOTIFICATION_PLATFORM is not defined');
}

const checkForToken = (params, app) => {
	if ((params.headers || {}).token) {
		const userId = params.headers.token;
		return app.service('/users/').get(userId);
	}

	return Promise.resolve(false);
};

module.exports = function setup(app) {
	class MailService {
		// POST
		async create(data, params) {
			if (!NOTIFICATION_PLATFORM) {
				throw new Unavailable('Required Env NOTIFICATION_PLATFORM is not defined');
			}

			const serviceUrls = app.get('services') || {};

			const user = await checkForToken(params, app);

			const {
				headers,
				email,
				replyEmail,
				subject,
				content,
				// TODO: must be implemented by the mailservice
				// currently only used by the helpdesk
				// attachments,
			} = data;

			const Mail = {
				to: user ? user.email : email,
				subject,
				text: content.text,
				html: content.html,
				from: SMTP_SENDER || replyEmail || 'noreply@schul-cloud.org',
				replyTo: replyEmail || SMTP_SENDER || 'noreply@schul-cloud.org',
			};

			const requestOptions = {
				uri: `${serviceUrls.notification}/mails`,
				method: 'POST',
				headers: {
					...headers,
				},
				body: {
					platform: NOTIFICATION_PLATFORM,
					...Mail,
				},
				json: true,
				timeout: REQUEST_TIMEOUT,
			};

			// send mail with defined transport object in production mode
			if (app.get('env') === 'production' || FORCE_SEND_EMAIL) {
				return request(requestOptions);
			}
			// otherwise print email message object on console
			return logger.debug('E-Mail Message not sent (not in production mode):', Mail);
		}
	}

	return MailService;
};
