
import XmlSchemaDefinition from './XmlSchemaDefinition';
import AutoType from './node/simpleType/AutoType';
import IntType from './node/simpleType/IntType';
import StringType from './node/simpleType/StringType';
import DateType from './node/simpleType/DateType';
import DateTimeType from './node/simpleType/DateTimeType';
import DecimalType from './node/simpleType/DecimalType';
import BooleanType from './node/simpleType/BooleanType';
import IntegerType from './node/simpleType/IntegerType';
import Base64BinaryType from './node/simpleType/Base64BinaryType';

export default class DocumentTypeDefinition {

	static createBaseXsd(): XmlSchemaDefinition {
		const baseXsd = new XmlSchemaDefinition({
			value: {
				targetNamespace: 'http://www.w3.org/2001/XMLSchema',
				otherAttributes: {
					'{http://www.w3.org/2000/xmlns/}xs': 'http://www.w3.org/2001/XMLSchema',
					targetNamespace: 'http://www.w3.org/2001/XMLSchema'
				}
			}
		}, 'BaseXmlSchemaDefinition');
		baseXsd.types.push(new AutoType(baseXsd));
		baseXsd.types.push(new IntType(baseXsd));
		baseXsd.types.push(new StringType(baseXsd));
		baseXsd.types.push(new DateType(baseXsd));
		baseXsd.types.push(new DateTimeType(baseXsd));
		baseXsd.types.push(new DecimalType(baseXsd));
		baseXsd.types.push(new BooleanType(baseXsd));
		baseXsd.types.push(new IntegerType(baseXsd));
		baseXsd.types.push(new Base64BinaryType(baseXsd));
		return baseXsd;
	}

	private xsds: XmlSchemaDefinition[] = [];

	get schemas(): XmlSchemaDefinition[] {
		return this.xsds;
	}

	constructor() {
		this.addXsd(DocumentTypeDefinition.createBaseXsd());
	}

	addXsd(xsd: XmlSchemaDefinition): this {
		xsd.dtd = this;
		this.xsds.push(xsd);
		return this;
	}

	getXsd(namespace: string): XmlSchemaDefinition {
		return this.xsds.find(xsd => xsd.namespace == namespace);
	}

}