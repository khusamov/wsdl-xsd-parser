import * as Path from 'path';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { DocumentTypeDefinition as Dtd, XmlSchemaDefinition as Xsd } from '../';
import { Jsonix } from 'jsonix';
import { XSD_1_0 } from 'w3c-schemas';

/**
 * Загрузка XSD-файла в JavaScript-объект.
 * Вспомогательная функция.
 * @param pathToFile
 * @returns {object}
 */
async function loadXsdFile(pathToFile): Promise<object> {
	return await new Promise((resolve, reject) => {
		const context = new Jsonix.Context([XSD_1_0]);
		const unmarshaller = context.createUnmarshaller();
		unmarshaller.unmarshalFile(pathToFile, resolve);
	});
}

describe('XmlSchemaDefinition', function() {
	it('XmlSchemaDefinition', async function() {
		const dtd = new Dtd();
		const xsdJsonData = await loadXsdFile(Path.join(__dirname, 'wsdl/Debtor/DebtorModel.xsd'));
		const xsd1 = new Xsd(xsdJsonData, 'file-id1');
		dtd.addXsd(xsd1);
		// В объекте dtd изначально включается базовая схема.
		// См. метод static DocumentTypeDefinition.createBaseXsd().
		assert.strictEqual<number>(dtd.schemas.length, 2);
	});
});