
import Node from './Node';
import Extension from './Extension';
import Element from './Element';
import ComplexType from './ComplexType';

/**
 * Содержит расширения или ограничения для сложного типа, хранящего смешанное содержимое или только элементы.
 * https://msdn.microsoft.com/ru-ru/library/ms256053(v=vs.120).aspx
 */
export default class ComplexContent extends Node {

	private extension: Extension;

	get elements(): Element[] {
		return this.extension.elements;
	}

	get baseComplexType(): ComplexType {
		return this.extension.baseComplexType;
	}

	constructor(data: any, ownerNode?: Node) {
		super(data, ownerNode);
		if ('extension' in data) this.extension = new Extension(data.extension, this);

		// Регистрация дочерних узлов.
		if (this.extension) this.childs = this.childs.concat(this.extension);

	}

}