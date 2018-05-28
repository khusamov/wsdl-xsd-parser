
import XmlSchemaDefinition from '../../XmlSchemaDefinition';
import Type from '../Type';
import Node from '../Node';
import Restriction from '../Restriction';

export default class SimpleType extends Type {

	public extName: string;

	public restriction: Restriction;

	get isPrimitive() {
		return !this.restriction || !this.restriction.baseSimpleType;
	}

	get rootSimpleType(): SimpleType {
		return this.restriction ? this.restriction.rootSimpleType : undefined;
	}

	constructor(data: any, ownerNode: Node) {
		super(data, ownerNode);
		// if (!('restriction' in data) || !data.restriction) throw new Error(`Не найдена секция 'restriction' в типе SimpleType '${this.name}'.`);
		
		// try {
		// 	this.restriction = new Restriction(data.restriction, this);
		// } catch (err) {
		// 	console.log(data)
		// }
		
		if ('restriction' in data) this.restriction = new Restriction(data.restriction, this);

		// Регистрация дочерних узлов.
		if (this.restriction) this.childs = this.childs.concat(this.restriction);

	}

}