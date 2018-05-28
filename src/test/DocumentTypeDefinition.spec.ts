import { describe, it } from 'mocha';
import { assert } from 'chai';
import { DocumentTypeDefinition } from '../';

describe('DocumentTypeDefinition', function() {
	it('DocumentTypeDefinition', function() {
		const dtd = new DocumentTypeDefinition();
		assert.strictEqual<number>(dtd.schemas.length, 1);
	});
});