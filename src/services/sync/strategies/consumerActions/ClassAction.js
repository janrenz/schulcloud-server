const BaseConsumerAction = require('./BaseConsumerAction');
// TODO: place from where it is importat must be fixed later
const { LDAP_SYNC_ACTIONS } = require('../LDAPSyncer');
const { SchoolRepo, ClassRepo, UserRepo } = require('../../repo');
const { NotFound } = require('../../../../errors');

const defaultOptions = {
	allowedLogKeys: ['class', 'ldapDN', 'systemId', 'schoolDn', 'year'],
};

// TODO: in all actions it looks not nice that filterActive is not passed as option
// the additional this it not really nessasry because options pass all to this.
// but we must also keep in mind that we do not hide options behind BaseConsumerStrategie class.
// But Enable / Disable filter should come from top this is fine.
// If we pass filterActive to options, we must destructure options -> set defaults (that we do not must set repos if we pass this) -> put the combind keys as optiosn to super
// -> i do not like it because we put knowlege and logic handling to the constructor and every they want to add a new action must do it in the same way and implement the same.
// --> sound weird...
class ClassAction extends BaseConsumerAction {
	constructor(filterActive = true, options = defaultOptions) {
		super(LDAP_SYNC_ACTIONS.SYNC_CLASSES, options);
		this.filterActive = filterActive;
	}

	async action(data = {}) {
		const { class: classData = {} } = data;

		const school = await SchoolRepo.findSchoolByLdapIdAndSystem(classData.schoolDn, classData.systemId);

		if (school) {
			const existingClass = await ClassRepo.findClassByYearAndLdapDn(school.currentYear, classData.ldapDN);
			if (existingClass) {
				if (existingClass.name !== classData.name) {
					await ClassRepo.updateClassName(existingClass._id, classData.name);
				}
			} else {
				await ClassRepo.createClass(classData, school);
			}
			await this.addUsersToClass(classData, school);
		} else {
			throw new NotFound(`School for ${classData.schoolDn} and ${classData.systemId} couldn't be found.`, {
				schoolDn: classData.schoolDn,
				systemId: classData.systemId,
			});
		}
	}

	async addUsersToClass(classData, schoolObject) {
		const students = [];
		const teachers = [];
		const classObject = await ClassRepo.findClassByYearAndLdapDn(schoolObject.currentYear, classData.ldapDN);
		if (!Array.isArray(classData.uniqueMembers)) {
			// if there is only one member, ldapjs doesn't give us an array here
			classData.uniqueMembers = [classData.uniqueMembers];
		}
		const users = await UserRepo.findByLdapDnsAndSchool(classData.uniqueMembers, schoolObject._id);
		users.forEach((user) => {
			user.roles.forEach((role) => {
				if (role.name === 'student') students.push(user._id);
				if (role.name === 'teacher') teachers.push(user._id);
			});
		});
		if (students.length > 0) {
			await ClassRepo.updateClassStudents(classObject._id, students);
		}
		if (teachers.length > 0) {
			await ClassRepo.updateClassTeachers(classObject._id, teachers);
		}
	}
}

module.exports = ClassAction;
