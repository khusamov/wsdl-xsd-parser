
import Node from './Node';
import SimpleType from './simpleType/SimpleType';

/**
 * Задает ограничения на определение простого типа.
 * https://msdn.microsoft.com/ru-ru/library/ms256057%28v=vs.120%29.aspx?f=255&MSPPError=-2147217396
 * Задает ограничения на определение simpleContent.
 * https://msdn.microsoft.com/ru-ru/library/ms256219(v=vs.120).aspx
 * Задает ограничения на определение complexContent.
 * https://msdn.microsoft.com/ru-ru/library/ms256061(v=vs.120).aspx
 */
export default class Restriction extends Node {

	get baseSimpleTypeFullName(): string {
		return this.getAttributeValue('base');
	}

	get baseSimpleType(): SimpleType {
		return this.ownerSimpleType.xsd.findType(this.baseSimpleTypeFullName, SimpleType) as SimpleType;
	}

	get rootSimpleType() {
		return this.baseSimpleType ? 
			(this.baseSimpleType.isPrimitive ? this.baseSimpleType : this.baseSimpleType.restriction.rootSimpleType) : 
			this.baseSimpleType;
	}

	constructor(data: any, private ownerSimpleType: SimpleType) {
		super(data, ownerSimpleType);
	}

}