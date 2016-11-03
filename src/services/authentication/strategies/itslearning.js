'use strict';
const app = require('../../../app');
const logger = require('winston');
const promisify = require('es6-promisify');
const errors = require('feathers-errors');
const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const binPath = phantomjs.path;



var itsLearning;

const AbstractLoginStrategy = require('./interface.js');

class ITSLearningLoginStrategy extends AbstractLoginStrategy {

	login({
		username,
		password
	}, system) {

		const itsLearningOptions = {
			username: username,
			password: password,
			wwwroot: system,
			logger: logger
		};
		if (!itsLearningOptions.username) return Promise.reject('No username set');
		if (!itsLearningOptions.password) return Promise.reject(new errors.NotAuthenticated('No password set'));
		if (!itsLearningOptions.wwwroot) return Promise.reject('No url for ITSLearning login provided');

		var childArgs = [
			path.join(__dirname, '/utils/itslearning_phantom.js'), itsLearningOptions.username, itsLearningOptions.password, itsLearningOptions.wwwroot
		];

		return new Promise((resolve, reject) => {
			childProcess.execFile(binPath, childArgs, (err, stdout, stderr) => {
					if(err) {
						reject(err);
					} else {
						resolve(stdout);
					}
			});
		}).then(url => {
			let itsLearningResponse = {};
			itsLearningResponse.username = this.getParameterByName('Username', url);
			itsLearningResponse.eLogin = this.getParameterByName('fromElogin', url);
			itsLearningResponse.customerId = this.getParameterByName('CustomerId', url);
			itsLearningResponse.hash = this.getParameterByName('Hash', url);
			itsLearningResponse.timeStamp = this.getParameterByName('TimeStamp', url);
			itsLearningResponse.success = !itsLearningResponse.username ? false : true;
			return itsLearningResponse;
		});
	}

	//Regex for the query string
	getParameterByName(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
}
module.exports = ITSLearningLoginStrategy;
