import { describe, it } from 'mocha';
import { assert } from 'chai';
import { DocumentTypeDefinition } from '../';

describe('DocumentTypeDefinition', function() {
	it('DocumentTypeDefinition', function() {
		const dtd = new DocumentTypeDefinition();
		// В объекте dtd изначально включается базовая схема.
		// См. метод static DocumentTypeDefinition.createBaseXsd().
		assert.strictEqual<number>(dtd.schemas.length, 1);
	});
});