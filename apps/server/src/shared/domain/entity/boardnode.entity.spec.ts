import { boardNodeFactory } from '@shared/testing/factory/boardnode.factory';

describe('BoardNode', () => {
	describe('hasParent', () => {
		it('should return false for root nodes', () => {
			const node = boardNodeFactory.build();
			expect(node.hasParent()).toBe(false);
		});

		it('should return true for nested nodes', () => {
			const node = boardNodeFactory.build();
			node.path = ',63ffb662acf052cfb874d0de,63ffb662acf052cfb874d0df,';
			expect(node.hasParent()).toBe(true);
		});
	});

	describe('ancestorIds', () => {
		it('should return the list of ancestor ids', () => {
			const node = boardNodeFactory.build();
			node.path = ',63ffb662acf052cfb874d0de,63ffb662acf052cfb874d0df,';
			expect(node.ancestorIds).toEqual(['63ffb662acf052cfb874d0de', '63ffb662acf052cfb874d0df']);
		});
	});

	describe('parentId', () => {
		describe('on root', () => {
			it('should return undefined', () => {
				const node = boardNodeFactory.build();
				expect(node.parentId).toBe(undefined);
			});
		});

		describe('on nested node', () => {
			it('should return parent id', () => {
				const node = boardNodeFactory.build();
				node.path = ',63ffb662acf052cfb874d0de,63ffb662acf052cfb874d0df,';
				expect(node.parentId).toBe('63ffb662acf052cfb874d0df');
			});
		});
	});
});