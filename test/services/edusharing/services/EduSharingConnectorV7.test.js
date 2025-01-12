const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');
const request = require('request-promise-native');
const { Configuration } = require('@hpi-schul-cloud/commons');
const appPromise = require('../../../../src/app');
const MockNode = JSON.stringify(require('../mock/response-node.json'));
const MockNodes = JSON.stringify(require('../mock/response-nodes.json'));
const EduSharingResponse = require('../../../../src/services/edusharing/services/EduSharingResponse');
const EduSharingConnectorV7 = require('../../../../src/services/edusharing/services/EduSharingConnectorV7');
const testObjects = require('../../helpers/testObjects')(appPromise());

const { setupNestServices, closeNestServices } = require('../../../utils/setup.nest.services');

describe('EduSharingV7 FIND', () => {
	let app;
	let eduSharingResponse;
	let eduSharingService;
	let server;
	let nestServices;

	before(async () => {
		Configuration.set('ES_API_V7', true);
		app = await appPromise();
		eduSharingService = app.service('edu-sharing');
		eduSharingService.connector = EduSharingConnectorV7;
		eduSharingResponse = new EduSharingResponse();
		server = await app.listen(0);
		nestServices = await setupNestServices(app);
	});

	after(async () => {
		await testObjects.cleanup();
		await server.close();
		await closeNestServices(nestServices);
	});

	afterEach(async () => {
		sinon.verifyAndRestore();
	});

	it('registered the service', async () => {
		assert.ok(eduSharingService);
	});

	it('search with an empty query', async () => {
		try {
			const student = await testObjects.createTestUser({ roles: ['student'] });
			const paramsStudent = await testObjects.generateRequestParamsFromUser(student);
			paramsStudent.query = { searchQuery: '' };
			const response = await eduSharingService.find(paramsStudent);

			chai.expect(JSON.stringify(response)).to.equal(JSON.stringify(eduSharingResponse));
		} catch (err) {
			throw new Error(err);
		}
	});

	it('search with params', async () => {
		try {
			const student = await testObjects.createTestUser({ roles: ['student'] });
			const paramsStudent = await testObjects.generateRequestParamsFromUser(student);

			const postStub = sinon.stub(request, 'post');
			postStub.onCall(0).throws({ statusCode: 403, message: 'Stubbing request fail' });
			postStub.onCall(1).returns(MockNodes);

			paramsStudent.query = { searchQuery: 'foo' };
			const response = await eduSharingService.find(paramsStudent);

			chai.expect(response.total).to.gte(1);
		} catch (err) {
			throw new Error(err);
		}
	});

	it('should search for a collection', async () => {
		try {
			const user = await testObjects.createTestUser({ roles: ['teacher'] });
			const params = await testObjects.generateRequestParamsFromUser(user);

			const postStub = sinon.stub(request, 'post');
			postStub.onCall(0).returns(MockNodes);

			params.query = { collection: 'a4808865-da94-4884-bdba-0ad66070e83b' };
			const response = await eduSharingService.find(params);

			chai
				.expect(postStub.getCalls()[0].args[0].body)
				.contains(
					`{"property":"ccm:hpi_lom_relation","values":["{'kind': 'ispartof', 'resource': {'identifier': ['a4808865-da94-4884-bdba-0ad66070e83b']}}"]`
				);
			chai.expect(response.total).to.gte(1);
		} catch (err) {
			throw new Error(err);
		}
	});

	it('should search with searchable flag', async () => {
		try {
			const user = await testObjects.createTestUser({ roles: ['teacher'] });
			const params = await testObjects.generateRequestParamsFromUser(user);

			const postStub = sinon.stub(request, 'post');
			postStub.onCall(0).returns(MockNodes);

			params.query = { searchQuery: 'foo' };
			const response = await eduSharingService.find(params);

			chai.expect(postStub.getCalls()[0].args[0].body).contains(`{"property":"ccm:hpi_searchable","values":["1"]}`);
			chai.expect(response.total).to.gte(1);
		} catch (err) {
			throw new Error(err);
		}
	});

	it('should fail to get a node with invalid uuid', async () => {
		try {
			const user = await testObjects.createTestUser({ roles: ['teacher'], schoolId: '5fcfb0bc685b9af4d4abf899' });
			const params = await testObjects.generateRequestParamsFromUser(user);
			await eduSharingService.get('dummyNodeId', params);
			throw new Error('should have failed');
		} catch (err) {
			chai.expect(err.message).to.not.equal('should have failed');
			chai.expect(err.code).to.equal(404);
			chai.expect(err.message).to.equal('Invalid node id dummyNodeId');
		}
	});

	it('should get a node', async () => {
		try {
			const user = await testObjects.createTestUser({ roles: ['teacher'], schoolId: '5fcfb0bc685b9af4d4abf899' });
			const params = await testObjects.generateRequestParamsFromUser(user);
			const postStub = sinon.stub(request, 'post');

			postStub.onCall(0).returns(MockNode);
			const mockImg = { body: 'dummyImage' };
			postStub.onCall(1).returns(mockImg);

			const response = await eduSharingService.get('9ff3ee4e-e679-4576-bad7-0eeb9b174716', params);
			chai.expect(response.title).to.equal('dummy title');
			chai
				.expect(postStub.getCalls()[0].args[0].body)
				.contains(`{"property":"ccm:replicationsourceuuid","values":["9ff3ee4e-e679-4576-bad7-0eeb9b174716"]`);
		} catch (err) {
			throw new Error(err);
		}
	});
});

describe('EduSharingV7 config flags', () => {
	let app;
	let eduSharingService;
	let server;
	let nestServices;
	let originalConfiguration;

	before(async () => {
		originalConfiguration = Configuration.get('FEATURE_ES_COLLECTIONS_ENABLED');
		app = await appPromise();
		eduSharingService = app.service('edu-sharing');
		server = await app.listen(0);
		nestServices = await setupNestServices(app);
	});

	after(async () => {
		Configuration.set('FEATURE_ES_COLLECTIONS_ENABLED', originalConfiguration);
		await testObjects.cleanup(app);
		await server.close();
		await closeNestServices(nestServices);
	});

	afterEach(async () => {
		sinon.verifyAndRestore();
	});

	it('should search with collections flag disabled', async () => {
		try {
			Configuration.set('FEATURE_ES_COLLECTIONS_ENABLED', false);

			const user = await testObjects.createTestUser({ roles: ['teacher'] });
			const params = await testObjects.generateRequestParamsFromUser(user);

			const postStub = sinon.stub(request, 'post');
			postStub.onCall(0).returns(MockNodes);

			params.query = { searchQuery: 'foo' };
			const response = await eduSharingService.find(params);

			chai
				.expect(postStub.getCalls()[0].args[0].body)
				.contains(`{"property":"ccm:hpi_lom_general_aggregationlevel","values":["1"]}`);
			chai.expect(response.total).to.gte(1);
		} catch (err) {
			throw new Error(err);
		}
	});
});
