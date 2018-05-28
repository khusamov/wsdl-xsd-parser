
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class StringType extends SimpleType {

	public extName: string = 'string';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.String',
			otherAttributes: {
				name: 'string'
			}
		}, xsd);
	}

}