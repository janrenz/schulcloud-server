const { expect } = require('chai');
const app = require('../../../../src/app');
const testObjects = require('../../helpers/testObjects')(app);
const { courseGroupModel } = require('../../../../src/services/user-group/model');

describe('courseGroup service', () => {
	let server;

	before((done) => {
		server = app.listen(0, done);
	});

	after(async () => {
		await testObjects.cleanup();
		await server.close();
	});

	describe('besic functions', () => {
		it('CREATE a courseGroup', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const course = await testObjects.createTestCourse({ userIds: [student._id] });
			const params = await testObjects.generateRequestParamsFromUser(student);
			const result = await app.service('courseGroups').create({
				name: 'testcoursegroup',
				schoolId: schoolId.toString(),
				userIds: [student._id],
				courseId: course._id,
			}, params);
			expect(result).to.not.be.undefined;
			expect(result).to.haveOwnProperty('_id');
			expect(result.name).to.eq('testcoursegroup');
			expect(result.schoolId.toString()).to.eq(schoolId.toString());
			// make sure course was saved to db
			const dbResult = await courseGroupModel.findById(result._id).lean().exec();
			expect(dbResult).to.not.be.undefined;
			expect(dbResult).to.haveOwnProperty('_id');
			expect(dbResult.name).to.eq('testcoursegroup');
			expect(dbResult.schoolId.toString()).to.eq(schoolId.toString());
		});

		it('GET a courseGroup', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const { _id: courseId } = await testObjects.createTestCourse({ schoolId, teacherIds: [student._id] });
			const courseGroup = await testObjects.createTestCourseGroup({ schoolId, courseId, userIds: [student._id] });
			const params = await testObjects.generateRequestParamsFromUser(student);
			params.query = {};
			const result = await app.service('courseGroups').get(courseGroup._id, params);
			expect(result).to.not.be.undefined;
			expect(result).to.haveOwnProperty('_id');
			expect(result).to.haveOwnProperty('name');
			expect(result.schoolId.toString()).to.eq(schoolId.toString());
		});

		it('FIND courseGroups', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const { _id: courseId } = await testObjects.createTestCourse({ schoolId, teacherIds: [student._id] });
			const courseGroup = await testObjects.createTestCourseGroup({ schoolId, courseId, userIds: [student._id] });
			const params = await testObjects.generateRequestParamsFromUser(student);
			params.query = { _id: courseGroup._id };
			const result = await app.service('courseGroups').find(params);
			expect(result.data).to.not.be.undefined;
			expect(result.total).to.equal(1);
			expect(result.data[0]).to.haveOwnProperty('_id');
			expect(result.data[0]).to.haveOwnProperty('name');
			expect(result.data[0].schoolId.toString()).to.eq(schoolId.toString());
		});

		it('PATCH a courseGroup', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const studentToAdd = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const { _id: courseId } = await testObjects.createTestCourse({ schoolId, teacherIds: [student._id] });
			const courseGroup = await testObjects.createTestCourseGroup({ schoolId, courseId, userIds: [student._id] });
			const params = await testObjects.generateRequestParamsFromUser(student);
			const result = await app.service('courseGroups').patch(
				courseGroup._id, { $push: { userIds: studentToAdd._id } }, params,
			);
			expect(result).to.not.be.undefined;
			expect(result.userIds.length).to.eq(2);
		});

		it('UPDATE a courseGroup', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const { _id: courseId } = await testObjects.createTestCourse({ schoolId, teacherIds: [student._id] });
			const courseGroup = await testObjects.createTestCourseGroup({ schoolId, courseId, userIds: [student._id] });
			const params = await testObjects.generateRequestParamsFromUser(student);
			params.query = {};
			const result = await app.service('courseGroups').update(
				courseGroup._id, {
					name: 'A-Team', schoolId: schoolId.toString(), courseId, userIds: [student._id],
				}, params,
			);
			expect(result).to.not.be.undefined;
			expect(result.name).to.eq('A-Team');
		});

		it('REMOVE a courseGroup', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const { _id: courseId } = await testObjects.createTestCourse({ schoolId, teacherIds: [student._id] });
			const courseGroup = await testObjects.createTestCourseGroup({ schoolId, courseId, userIds: student._id });
			const params = await testObjects.generateRequestParamsFromUser(student);
			params.query = {};
			const result = await app.service('courseGroups').remove(
				courseGroup._id, params,
			);
			expect(result).to.not.be.undefined;
			expect(result).to.haveOwnProperty('_id');
		});
	});

	describe('security', () => {
		it('CREATE fails for other course', async () => {
			const { _id: schoolId } = await testObjects.createTestSchool({});
			const student = await testObjects.createTestUser({ roles: ['student'], schoolId });
			const course = await testObjects.createTestCourse({ userIds: [] });
			const params = await testObjects.generateRequestParamsFromUser(student);
			try {
				await app.service('courseGroups').create({
					name: 'testcoursegroup',
					schoolId: schoolId.toString(),
					userIds: [student._id],
					courseId: course._id,
				}, params);
				throw new Error('should have failed');
			} catch (err) {
				console.log(err);
				expect(err.message).to.not.equal('should have failed');
				expect(err.code).to.equal(404);
				expect(err.message).to.equal('invalid courseId');
			}
		});
	});
});
