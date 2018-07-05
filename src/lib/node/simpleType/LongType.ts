
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class LongType extends SimpleType {

	public extName: string = 'integer';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Long',
			otherAttributes: {
				name: 'long'
			}
		}, xsd);
	}

}