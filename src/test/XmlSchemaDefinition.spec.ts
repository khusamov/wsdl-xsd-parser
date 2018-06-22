import * as Path from 'path';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { XsdGroup, Xsd } from '../';

describe('XmlSchemaDefinition', function() {
	it('XmlSchemaDefinition', async function() {
		const xsdGroup = new XsdGroup();
		const xsd1 = await Xsd.load('file-id1', Path.join(__dirname, 'wsdl/Debtor/DebtorModel.xsd'));
		xsdGroup.addXsd(xsd1);
		// В объекте xsdGroup изначально включается базовая схема. Поэтому схем в группе две, а не одна.
		// См. метод static DocumentTypeDefinition.createBaseXsd().
		assert.strictEqual<number>(xsdGroup.schemas.length, 2);
	});
});