
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class IntegerType extends SimpleType {

	public extName: string = 'integer';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Integer',
			otherAttributes: {
				name: 'integer'
			}
		}, xsd);
	}

}