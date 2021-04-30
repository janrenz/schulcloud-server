/* eslint-disable max-classes-per-file */
const { INTERNAL_SERVER_ERROR_TYPE, ASSERTION_ERROR_TYPE, FORBIDDEN_ERROR_TYPE } = require('./commonErrorTypes');

/**
 * A base Class for all application specific (not-framework related) errors
 * Please do not use this class directly - please use one of the subclass below
 * @abstract
 */
class ApplicationError extends Error {
	/**
	 * Abstraction for concrete implementations of business errors
	 */
	constructor({ type, title, defaultMessage }, cause, params) {
		super(type);
		this.name = this.constructor.name;
		this.cause = cause;
		this.title = title;
		this.defaultMessage = defaultMessage;
		this.params = params;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * A base Class for all Technical errors
 * Please do not use this class directly - please use one of the subclass below
 * @abstract
 */
class TechnicalError extends ApplicationError {}

/**
 * A base Class for all Business Logic errors
 * Please do not use this class directly - please use one of the subclass below
 * @abstract
 */
class BusinessError extends ApplicationError {}

// TECHNICAL ERRORS
/**
 * An Error wrapper class for all unrecoverable, technical errors
 */
class InternalServerError extends TechnicalError {
	constructor(cause, params) {
		super(INTERNAL_SERVER_ERROR_TYPE, cause, params);
	}
}

/**
 * For Resource/Document not found cases
 */
class DocumentNotFound extends TechnicalError {}

/**
 * Error for parameter assertions.
 * @see {validationErrors} in src/common/validation/validationHelper.js
 */
class AssertionError extends TechnicalError {
	constructor(validationErrors) {
		super(ASSERTION_ERROR_TYPE, undefined, validationErrors);
	}
}

// BUSINESS ERRORS
/**
 * Error for any validation error
 */
class ValidationError extends BusinessError {
	constructor(errorType, validationErrors) {
		super(errorType, undefined, validationErrors);
	}
}

/**
 * For Data Access Permission checks
 */
class ForbiddenError extends BusinessError {
	constructor(requestedResourceId, callerId) {
		super(FORBIDDEN_ERROR_TYPE, undefined, { requestedResourceId, callerId });
	}
}

/**
 * For brute force prevention
 */
class SilentError extends BusinessError {
	constructor(message) {
		// hide the real cause - is not a part of any response object
		super({ type: message });
	}

	/**
	 * A silent error is thrown when we not want to report it to a user via REST. Instead this property content is returned in case of success and error.
	 */
	static get RESPONSE_CONTENT() {
		return { success: 'success' };
	}
}

/* internally helper, need to test */
const filterKeys = (data = {}, allowedKeys = null) => {
	let result = {};

	if (allowedKeys) {
		const filteredEntries = Object.entries(data).filter(([key, value]) => allowedKeys.includes(key));
		result = Object.fromEntries(filteredEntries);
	} else {
		result = data;
	}
	return result;
};

const filterKeys2 = (data = {}, allowedKeys = null) => {
	if (allowedKeys) {
		for (const key in data) {
			if (!allowedKeys.includes(key)) {
				delete data[key];
			} else if (typeof data[key] === 'object') {
				filterKeys(data[key], allowedKeys);
			}
		}
	}
	return data;
};

// possible to bind allowedKeys and taskType
class SyncError extends Error {
	constructor(taskType, error, { syncId, data = {}, allowedKeys = null } = {}) {
		super(taskType);
		this.name = this.constructor.name;
		this.message = error.message;
		this.syncId = syncId;
		this.data = {};
		Object.entries(data).forEach(([key, value]) => {
			this.data[key] = filterKeys(value, allowedKeys);
		});
		this.error = error;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = {
	private: {
		filterKeys,
	},
	ApplicationError,
	TechnicalError,
	BusinessError,
	InternalServerError,
	AssertionError,
	DocumentNotFound,
	SilentError,
	ValidationError,
	ForbiddenError,
	SyncError,
};
