import { EntityManager } from '@mikro-orm/mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryDatabaseModule } from '@shared/infra/database';
import { cleanupCollections } from '@shared/testing';
import { boardNodeFactory } from '@shared/testing/factory/boardnode.factory';
import { ColumnBoardRepo } from './column-board.repo';

describe('ColumnBoardRepo', () => {
	let module: TestingModule;
	let repo: ColumnBoardRepo;
	let em: EntityManager;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [MongoMemoryDatabaseModule.forRoot()],
			providers: [ColumnBoardRepo],
		}).compile();
		repo = module.get(ColumnBoardRepo);
		em = module.get(EntityManager);
	});

	afterAll(async () => {
		await module.close();
	});

	afterEach(async () => {
		await cleanupCollections(em);
		// await em.nativeDelete(BoardNode, {});
	});

	const setup = async () => {
		const root = boardNodeFactory.build();
		await em.persistAndFlush(root);
		const level1 = boardNodeFactory.buildList(2, { parent: root });
		await em.persistAndFlush(level1);
		const level2 = boardNodeFactory.buildList(2, { parent: level1[0] });
		await em.persistAndFlush(level2);
		const level3 = boardNodeFactory.buildList(2, { parent: level2[1] });
		await em.persistAndFlush(level3);
		em.clear();

		return { root, level1, level2, level3 };
	};

	describe('findDescendants', () => {
		describe('when starting at the root node', () => {
			it('should find descendents with a specific depth', async () => {
				const { root, level1, level2 } = await setup();

				const result = await repo.findDescendants(root, 2);

				const resultIds = result.map((o) => o.id).sort();
				const expectedIds = [...level1, ...level2].map((o) => o.id).sort();
				expect(resultIds).toEqual(expectedIds);
			});
		});

		describe('when starting at a nested node', () => {
			it('should find descendents with a specific depth', async () => {
				const { level1, level2, level3 } = await setup();

				const result = await repo.findDescendants(level1[0], 2);

				const resultIds = result.map((o) => o.id).sort();
				const expectedIds = [...level2, ...level3].map((o) => o.id).sort();
				expect(resultIds).toEqual(expectedIds);
			});
		});
	});

	// TODO debug this
	// describe('findNodeAndDescendants', () => {
	// 	describe('when starting at the root node', () => {
	// 		it('should find descendents with a specific depth', async () => {
	// 			const { root, level1, level2 } = await setup();

	// 			const result = await repo.findNodeAndDescendants(root, 2);

	// 			const resultIds = result.map((o) => o.id).sort();
	// 			const expectedIds = [root, ...level1, ...level2].map((o) => o.id).sort();
	// 			expect(resultIds).toEqual(expectedIds);
	// 		});
	// 	});

	// 	describe('when starting at a nested node', () => {
	// 		it('should find descendents with a specific depth', async () => {
	// 			const { level1, level2, level3 } = await setup();

	// 			const result = await repo.findNodeAndDescendants(level1[0], 2);

	// 			const resultIds = result.map((o) => o.id).sort();
	// 			const expectedIds = [level1[0], ...level2, ...level3].map((o) => o.id).sort();
	// 			expect(resultIds).toEqual(expectedIds);
	// 		});
	// 	});
	// });
});
