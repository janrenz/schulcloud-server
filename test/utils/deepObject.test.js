const { expect } = require('chai');

const { deepObject } = require('../../src/utils');

describe.only('[utils] deepObject', () => {
	it('Should export all avaible actions', () => {
		expect(deepObject.get).is.not.an('undefined');
		expect(deepObject.pathToArray).is.not.an('undefined');
	});

	describe('deepObject > pathToArray', () => {
		const { pathToArray } = deepObject;

		it('should work for empty input', () => {
			const result = pathToArray();
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(0);
		});

		it('should work for empty string input', () => {
			const result = pathToArray('');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(0);
		});

		it('should work for one string', () => {
			const result = pathToArray('x.y.z');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for one string without dot noation', () => {
			const result = pathToArray('x');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(1);
			expect(result[0]).to.equal('x');
		});

		it('should work for strings with a lot of dot noations', () => {
			const result = pathToArray('ele0.ele1.ele2.ele3.ele4.ele5.ele6.ele7.ele8.ele9.ele10');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(11);
			expect(result[0]).to.equal('ele0');
			expect(result[10]).to.equal('ele10');
		});

		it('should work for strings with point before or after', () => {
			const result = pathToArray('.x.y.z.');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for strings with points before or after', () => {
			const result = pathToArray('.x.y.z.');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for strings with double and multiple points', () => {
			const result = pathToArray('x..y...z.');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for multiple strings', () => {
			const result = pathToArray('x1.y1.z1', 'x2.y2.z2', 'x3.y3.z3');
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(9);
			expect(result[0]).to.equal('x1');
			expect(result[1]).to.equal('y1');
			expect(result[2]).to.equal('z1');
			expect(result[3]).to.equal('x2');
			expect(result[4]).to.equal('y2');
			expect(result[5]).to.equal('z2');
			expect(result[6]).to.equal('x3');
			expect(result[7]).to.equal('y3');
			expect(result[8]).to.equal('z3');
		});

		it('should work for one array with includes strings', () => {
			const result = pathToArray(['x', 'y', 'z']);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for muliple arrays', () => {
			const result = pathToArray(['x1', 'y1', 'z1'], ['x2', 'y2', 'z2'], ['x3', 'y3', 'z3']);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(9);
			expect(result[0]).to.equal('x1');
			expect(result[1]).to.equal('y1');
			expect(result[2]).to.equal('z1');
			expect(result[3]).to.equal('x2');
			expect(result[4]).to.equal('y2');
			expect(result[5]).to.equal('z2');
			expect(result[6]).to.equal('x3');
			expect(result[7]).to.equal('y3');
			expect(result[8]).to.equal('z3');
		});

		it('should work for muliple arrays and string mixes inputs', () => {
			const result = pathToArray(['x1', 'y1', 'z1'], 'x2.y2.z2', ['x3', 'y3', 'z3']);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(9);
			expect(result[0]).to.equal('x1');
			expect(result[1]).to.equal('y1');
			expect(result[2]).to.equal('z1');
			expect(result[3]).to.equal('x2');
			expect(result[4]).to.equal('y2');
			expect(result[5]).to.equal('z2');
			expect(result[6]).to.equal('x3');
			expect(result[7]).to.equal('y3');
			expect(result[8]).to.equal('z3');
		});

		it('should work for dot notation strings in arrays with mixed inputs', () => {
			const result = pathToArray(['x1.y1.z1', 'x2.y2.z2', 'x3.y3.z3'], 'x4.y4.z4', ['x5', 'y5', 'z5']);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(15);
			expect(result[0]).to.equal('x1');
			expect(result[1]).to.equal('y1');
			expect(result[2]).to.equal('z1');
			expect(result[3]).to.equal('x2');
			expect(result[4]).to.equal('y2');
			expect(result[5]).to.equal('z2');
			expect(result[6]).to.equal('x3');
			expect(result[7]).to.equal('y3');
			expect(result[8]).to.equal('z3');
			expect(result[9]).to.equal('x4');
			expect(result[10]).to.equal('y4');
			expect(result[11]).to.equal('z4');
			expect(result[12]).to.equal('x5');
			expect(result[13]).to.equal('y5');
			expect(result[14]).to.equal('z5');
		});

		it('should work for dot notation strings in deep arrays with mixed inputs', () => {
			const result = pathToArray(
				['x1.y1.z1', 'x2.y2.z2', 'x3.y3.z3', ['x4.y4.z4', 'x5', 'y5', 'z5']],
				'x6.y6.z6', ['x7', 'y7', 'z7', 'ele1.ele2.ele3'],
			);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(24);
			expect(result[0]).to.equal('x1');
			expect(result[1]).to.equal('y1');
			expect(result[2]).to.equal('z1');
			expect(result[3]).to.equal('x2');
			expect(result[4]).to.equal('y2');
			expect(result[5]).to.equal('z2');
			expect(result[6]).to.equal('x3');
			expect(result[7]).to.equal('y3');
			expect(result[8]).to.equal('z3');
			expect(result[9]).to.equal('x4');
			expect(result[10]).to.equal('y4');
			expect(result[11]).to.equal('z4');
			expect(result[12]).to.equal('x5');
			expect(result[13]).to.equal('y5');
			expect(result[14]).to.equal('z5');
			expect(result[15]).to.equal('x6');
			expect(result[16]).to.equal('y6');
			expect(result[17]).to.equal('z6');
			expect(result[18]).to.equal('x7');
			expect(result[19]).to.equal('y7');
			expect(result[20]).to.equal('z7');
			expect(result[21]).to.equal('ele1');
			expect(result[22]).to.equal('ele2');
			expect(result[23]).to.equal('ele3');
		});

		it('should work for undefined input', () => {
			const result = pathToArray(undefined);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(0);
		});

		it('should work for undefined with mixed valid inputs', () => {
			const result = pathToArray('x.y.z', undefined);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for neested undefined inputs', () => {
			const result = pathToArray(['x.y.z', undefined]);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for empty null input', () => {
			const result = pathToArray(null);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(0);
		});

		it('should work for null inputs with mixed valid inputs', () => {
			const result = pathToArray('x.y.z', null);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		it('should work for neested null inputs', () => {
			const result = pathToArray(['x.y.z', null]);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(3);
			expect(result[0]).to.equal('x');
			expect(result[1]).to.equal('y');
			expect(result[2]).to.equal('z');
		});

		// should NOT work
		it('should not work for object inputs and return empty array', () => {
			const result = pathToArray('x1.y1.z1', { x: 1, y: 2, z: 3 });
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(0);
		});

		it('should not work for neested object inputs and return empty array', () => {
			const result = pathToArray(['x1.y1.z1', { x: 1, y: 2, z: 3 }]);
			expect(result).to.be.an('array');
			expect(result).have.lengthOf(0);
		});
	});

	describe('deepObject > get', () => {
		const { get } = deepObject;

		it('should return undefined for undefined as input', () => {
			const result = get(undefined, 'x.y.z');
			expect(result).to.be.an('undefined');
		});

		it('should return undefined for null as input', () => {
			const result = get(null, 'x.y.z');
			expect(result).to.be.an('undefined');
		});

		it('should return undefined if it can not resolve path', () => {
			const obj = {
				x: {
					other: {
						z: 1,
					},
				},
			};
			const result = get(obj, 'x.y.z');
			expect(result).to.be.an('undefined');
		});

		it('should return input for undefined as path', () => {
			const obj = {
				x: {
					other: {
						z: 1,
					},
				},
			};
			const result = get(obj, undefined);
			expect(result).to.deep.equal(obj);
		});

		it('should return input for null as path', () => {
			const obj = {
				x: {
					other: {
						z: 1,
					},
				},
			};
			const result = get(obj, null);
			expect(result).to.deep.equal(obj);
		});

		it('should return input for object as path', () => {
			const obj = {
				x: {
					other: {
						z: 1,
					},
				},
			};
			const result = get(obj, { x: { y: 1 } });
			expect(result).to.deep.equal(obj);
		});

		it('should return value if obj leaf is target and path can resolve', () => {
			const value = 123;
			const obj = {
				x: {
					y: {
						z: value,
					},
				},
			};
			const result = get(obj, 'x.y.z');
			expect(result).equal(value);
		});

		it('should return value if not obj leaf is target and path can resolve', () => {
			const value = {
				z: 123,
			};
			const obj = {
				x: {
					y: value,
				},
			};
			const result = get(obj, 'x.y');
			expect(result).to.deep.equal(value);
		});
	});
});
