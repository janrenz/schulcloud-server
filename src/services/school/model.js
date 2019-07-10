// model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');

const { Schema } = mongoose;
const fileStorageTypes = ['awsS3'];

const rssFeedSchema = new Schema({
	url: {
		type: String,
		required: true,
		unique: true,
		sparse: true,
	},
	description: {
		type: String,
		default: '',
	},
	status: {
		type: String,
		default: 'pending',
		enum: ['pending', 'success', 'error'],
	},
});

const schoolSchema = new Schema({
	name: { type: String, required: true },
	address: { type: Object },
	fileStorageType: { type: String, enum: fileStorageTypes },
	systems: [{ type: Schema.Types.ObjectId, ref: 'system' }],
	federalState: { type: Schema.Types.ObjectId, ref: 'federalstate' },
	createdAt: { type: Date, default: Date.now },
	ldapSchoolIdentifier: { type: String },
	updatedAt: { type: Date, default: Date.now },
	experimental: { type: Boolean, default: false },
	pilot: { type: Boolean, default: false },
	currentYear: { type: Schema.Types.ObjectId, ref: 'year' },
	logo_dataUrl: { type: String },
	purpose: { type: String },
	rssFeeds: [{ type: rssFeedSchema }],
	features: [{ type: String, enum: ['rocketChat', 'disableStudentTeamCreation'] }],
	inMaintenanceSince: { type: Date }, // see schoolSchema#inMaintenance (below)
}, {
	timestamps: true,
});

/**
 * Determine if school is in maintenance mode ("Schuljahreswechsel"):
 * 		inMaintenanceSince not set: maintenance mode is disabled (false)
 * 		inMaintenanceSince <  Date.now(): maintenance will be enabled at this date in the future (false)
 * 		inMaintenanceSince >= Date.now(): maintenance mode is enabled (true)
 */
schoolSchema.virtual('inMaintenance').get(function get() {
	return this.inMaintenanceSince && this.inMaintenanceSince <= Date.now();
});
schoolSchema.plugin(require('mongoose-lean-virtuals'));

const yearSchema = new Schema({
	name: { type: String, required: true },
});

const gradeLevelSchema = new Schema({
	name: { type: String, required: true },
});

const schoolModel = mongoose.model('school', schoolSchema);
const yearModel = mongoose.model('year', yearSchema);
const gradeLevelModel = mongoose.model('gradeLevel', gradeLevelSchema);

module.exports = {
	schoolModel,
	yearModel,
	gradeLevelModel,
	fileStorageTypes,
};
