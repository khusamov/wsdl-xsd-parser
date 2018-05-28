
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class BooleanType extends SimpleType {

	public extName: string = 'boolean';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Boolean',
			otherAttributes: {
				name: 'boolean'
			}
		}, xsd);
	}

}