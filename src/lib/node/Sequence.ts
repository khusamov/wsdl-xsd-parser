
import Node from './Node';
import ComplexType from './ComplexType';
import Element from './Element';

/**
 * Требует, чтобы элементы группы появлялись в содержащем их элементе в указанной последовательности.
 * https://msdn.microsoft.com/ru-ru/library/ms256089(v=vs.120).aspx
 */
export default class Sequence extends Node {

	elements: Element[] = [];

	constructor(data: any, ownerNode?: Node) {
		super(data, ownerNode);
		if ('element' in data) this.elements = data.element.map(e => new Element(e, this));


		// Регистрация дочерних узлов.
		if (this.elements) this.childs = this.childs.concat(this.elements);

	}

}