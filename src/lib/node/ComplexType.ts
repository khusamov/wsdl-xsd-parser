
import XmlSchemaDefinition from '../XmlSchemaDefinition';

import Node from './Node';
import Type from './Type';
import Sequence from './Sequence';
import Element from './Element';
import ComplexContent from './ComplexContent';

/**
 * Объявляет сложный тип, определяющий набор атрибутов и содержимое элемента.
 * https://msdn.microsoft.com/ru-ru/library/ms256067(v=vs.120).aspx
 */
export default class ComplexType extends Type {

	sequence: Sequence;

	complexContent: ComplexContent;

	get elements(): Element[] {
		return this.sequence ? this.sequence.elements : (this.complexContent ? this.complexContent.elements : []);
	}

	get baseComplexType(): ComplexType {
		return this.complexContent ? this.complexContent.baseComplexType : undefined;
	}

	constructor(data: any, ownerNode: Node) {
		super(data, ownerNode);


		if ('sequence' in data && 'complexContent' in data) {
			throw new Error(`Узлы Sequence и ComplexContent определены в ComplexType одновременно.`);
		}


		if ('sequence' in data) this.sequence = new Sequence(data.sequence, this);
		if ('complexContent' in data) this.complexContent = new ComplexContent(data.complexContent, this);

		// Регистрация дочерних узлов.
		if (this.sequence) this.childs = this.childs.concat(this.sequence);
		if (this.complexContent) this.childs = this.childs.concat(this.complexContent);

	}

}