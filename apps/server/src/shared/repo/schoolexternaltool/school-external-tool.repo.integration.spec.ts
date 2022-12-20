import { EntityManager, ObjectId } from '@mikro-orm/mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalTool, SchoolExternalTool } from '@shared/domain';
import { MongoMemoryDatabaseModule } from '@shared/infra/database';
import { cleanupCollections, externalToolFactory, schoolExternalToolFactory } from '@shared/testing';
import { ExternalToolRepoMapper } from '@shared/repo/externaltool/external-tool.repo.mapper';
import { Logger } from '@src/core/logger';
import { createMock } from '@golevelup/ts-jest';
import { SchoolExternalToolDO } from '@shared/domain/domainobject/external-tool/school-external-tool.do';
import { CustomParameterEntryDO } from '../../domain/domainobject/external-tool/custom-parameter-entry.do';
import { SchoolExternalToolRepo } from './school-external-tool.repo';

describe('SchoolExternalToolRepo', () => {
	let module: TestingModule;
	let repo: SchoolExternalToolRepo;
	let em: EntityManager;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [MongoMemoryDatabaseModule.forRoot()],
			providers: [
				SchoolExternalToolRepo,
				ExternalToolRepoMapper,
				{
					provide: Logger,
					useValue: createMock<Logger>(),
				},
			],
		}).compile();

		repo = module.get(SchoolExternalToolRepo);
		em = module.get(EntityManager);
	});

	afterAll(async () => {
		await module.close();
	});

	afterEach(async () => {
		await cleanupCollections(em);
	});

	const setup = async () => {
		const externalTool: ExternalTool = externalToolFactory.buildWithId();
		const schoolExternalTool1: SchoolExternalTool = schoolExternalToolFactory.buildWithId({ tool: externalTool });
		const schoolExternalTool2: SchoolExternalTool = schoolExternalToolFactory.buildWithId();
		const schoolExternalTool3: SchoolExternalTool = schoolExternalToolFactory.buildWithId({ tool: externalTool });

		await em.persistAndFlush([externalTool, schoolExternalTool1, schoolExternalTool2, schoolExternalTool3]);
		em.clear();

		return { externalTool, schoolExternalTool1, schoolExternalTool3 };
	};

	it('getEntityName should return SchoolExternalTool', () => {
		const { entityName } = repo;
		expect(entityName).toEqual(SchoolExternalTool);
	});

	describe('deleteByToolId', () => {
		it('should delete all SchoolExternalTools with reference to a given ExternalTool', async () => {
			const { externalTool } = await setup();

			const result: number = await repo.deleteByToolId(externalTool.id);

			expect(result).toEqual(2);
		});
	});

	describe('findByToolId', () => {
		it('should find all SchoolExternalTools with reference to a given ExternalTool', async () => {
			const { externalTool, schoolExternalTool1, schoolExternalTool3 } = await setup();

			const result: SchoolExternalToolDO[] = await repo.findByToolId(externalTool.id);

			expect(result).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ id: schoolExternalTool1.id }),
					expect.objectContaining({ id: schoolExternalTool3.id }),
				])
			);
		});
	});

	describe('save', () => {
		function setupDO() {
			const domainObject: SchoolExternalToolDO = new SchoolExternalToolDO({
				toolId: new ObjectId().toHexString(),
				parameters: [new CustomParameterEntryDO({ name: 'param', value: 'value' })],
				schoolId: new ObjectId().toHexString(),
				toolVersion: 1,
			});

			return {
				domainObject,
			};
		}

		it('should save a CourseExternalTool', async () => {
			const { domainObject } = setupDO();
			const { id, updatedAt, createdAt, ...expected } = domainObject;

			const result: SchoolExternalToolDO = await repo.save(domainObject);

			expect(result).toMatchObject(expected);
			expect(result.id).toBeDefined();
			expect(result.updatedAt).toBeDefined();
			expect(result.createdAt).toBeDefined();
		});
	});
});