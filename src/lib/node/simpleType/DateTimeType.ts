
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import SimpleType from './SimpleType';

export default class DateTimeType extends SimpleType {

	public extName: string = 'date';

	constructor(xsd: XmlSchemaDefinition) {
		super({
			TYPE_NAME: 'PrimitiveSimpleType.DateTime',
			otherAttributes: {
				name: 'dateTime'
			}
		}, xsd);
	}

}