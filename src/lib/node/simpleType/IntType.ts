
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class IntType extends SimpleType {

	public extName: string = 'integer';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Int',
			otherAttributes: {
				name: 'int'
			}
		}, xsd);
	}

}