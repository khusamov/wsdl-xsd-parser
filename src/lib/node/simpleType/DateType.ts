
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class DateType extends SimpleType {

	public extName: string = 'date';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.Date',
			otherAttributes: {
				name: 'date'
			}
		}, xsd);
	}

}