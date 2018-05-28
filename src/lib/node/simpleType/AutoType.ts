
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class AutoType extends SimpleType {

	public extName: string = 'auto';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Auto',
			otherAttributes: {
				name: 'auto'
			}
		}, xsd);
	}

}