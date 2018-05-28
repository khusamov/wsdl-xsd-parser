
import XmlSchemaDefinition from '../XmlSchemaDefinition';

import Node from './Node';
import Sequence from './Sequence';
import ComplexType from './ComplexType';
import Element from './Element';

/**
 * Содержит расширения для complexContent.
 * https://msdn.microsoft.com/ru-ru/library/ms256161(v=vs.120).aspx
 */
export default class Extension extends Node  {

	sequence: Sequence;

	get baseComplexTypeFullName(): string {
		return this.getAttributeValue('base');
	}

	get baseComplexType(): ComplexType {
		return (this.rootNode as XmlSchemaDefinition).findType(this.baseComplexTypeFullName, ComplexType) as ComplexType;
	}

	get elements(): Element[] {
		let result: Element[] = [];
		if (this.sequence) result = result.concat(this.sequence.elements);
		if (this.baseComplexType) result = result.concat(this.baseComplexType.elements);
		return result;
	}

	constructor(data: any, ownerNode?: Node) {
		super(data, ownerNode);
		if ('sequence' in data) this.sequence = new Sequence(data.sequence, this);

		// Регистрация дочерних узлов.
		if (this.sequence) this.childs = this.childs.concat(this.sequence);

	}

}