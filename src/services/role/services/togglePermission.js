const { authenticate } = require('@feathersjs/authentication');
const globalHooks = require('../../../hooks');
const Role = require('../model');


const hooks = {
	before: {
		all: [
			authenticate('jwt'),
			globalHooks.hasPermission('ROLE_VIEW'),
		],
	},
};


class TogglePermission {
	async create(data, params) {
		const { roleName } = params.route;
		const { toggle, permission } = data;

		const role = await Role.findOne({
			name: roleName,
		}).exec();

		const filterPermissions = (list, element) => list.filter((p) => p !== element);

		if (role) {
			const permissions = [...await role.getPermissions()];

			switch (permission) {
				case 'studentVisibility':
					if (toggle && !permissions.includes('STUDENT_LIST')) {
						permissions.push('STUDENT_LIST');
						await role.updateOne({ permissions });
					} else if (!toggle) {
						await role.updateOne({ permissions: filterPermissions(permissions, 'STUDENT_LIST') });
					}
					break;
				default:
					break;
			}
		}
		return [];
	}
}

module.exports = {
	TogglePermission,
	togglePermissionHooks: hooks,
};
