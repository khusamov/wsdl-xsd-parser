
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class Base64BinaryType extends SimpleType {

	public extName: string = 'string';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Base64Binary',
			otherAttributes: {
				name: 'base64Binary'
			}
		}, xsd);
	}

}