import { Configuration } from '@hpi-schul-cloud/commons/lib';
import { IConfig } from '@hpi-schul-cloud/commons/lib/interfaces/IConfig';
import { EntityManager } from '@mikro-orm/mongodb';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICurrentUser } from '@shared/domain';
import {
	cleanupCollections,
	courseFactory,
	mapUserToCurrentUser,
	roleFactory,
	taskFactory,
	userFactory,
} from '@shared/testing';
import { JwtAuthGuard } from '@src/modules/authentication/guard/jwt-auth.guard';
import { Request } from 'express';
import request from 'supertest';

Configuration.set('FEATURE_COPY_SERVICE_ENABLED', true);
Configuration.set('INCOMING_REQUEST_TIMEOUT_COPY_API', 1);
// eslint-disable-next-line import/first
import { ServerTestModule } from '@src/modules/server/server.module';

// This needs to be in a separate test file because of the above configuration.
// When we find a way to mock the config, it should be moved alongside the other API tests.
describe('Task copy (API)', () => {
	let app: INestApplication;
	let em: EntityManager;
	let currentUser: ICurrentUser;
	let configBefore: IConfig;

	beforeAll(async () => {
		configBefore = Configuration.toObject({ plainSecrets: true });
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ServerTestModule],
		})
			.overrideGuard(JwtAuthGuard)
			.useValue({
				canActivate(context: ExecutionContext) {
					const req: Request = context.switchToHttp().getRequest();
					req.user = currentUser;
					return true;
				},
			})
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		em = app.get(EntityManager);
	});

	afterAll(async () => {
		await cleanupCollections(em);
		await app.close();
		Configuration.reset(configBefore);
	});

	const setup = () => {
		const roles = roleFactory.buildList(1, { permissions: [] });
		const user = userFactory.build({ roles });

		return user;
	};

	it('should respond with 408 on timeout', async () => {
		const teacher = setup();
		const course = courseFactory.build({ name: 'course #1', teachers: [teacher] });
		const task = taskFactory.build({ name: 'task #1', course });

		await em.persistAndFlush([task, course]);
		em.clear();

		currentUser = mapUserToCurrentUser(teacher);

		const response = await request(app.getHttpServer())
			.post(`/tasks/${task.id}/copy`)
			.set('Authorization', 'jwt')
			.send();

		expect(response.status).toEqual(408);
	});
});