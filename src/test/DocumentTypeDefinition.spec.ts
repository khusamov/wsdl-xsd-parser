import { describe, it } from 'mocha';
import { assert } from 'chai';
import { XsdGroup } from '../';

describe('DocumentTypeDefinition', function() {
	it('DocumentTypeDefinition', function() {
		const xsdGroup = new XsdGroup();
		// В объекте dtd изначально включается базовая схема.
		// См. метод static DocumentTypeDefinition.createBaseXsd().
		assert.strictEqual<number>(xsdGroup.schemas.length, 1);
	});
});