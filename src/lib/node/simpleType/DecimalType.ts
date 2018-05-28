
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class DecimalType extends SimpleType {

	public extName: string = 'number';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Decimal',
			otherAttributes: {
				name: 'decimal'
			}
		}, xsd);
	}

}