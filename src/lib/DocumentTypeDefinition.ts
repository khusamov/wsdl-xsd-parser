
import * as pascalcase from 'pascalcase';

import XmlSchemaDefinition from './XmlSchemaDefinition';
import AutoType from './node/simpleType/AutoType';
import IntType from './node/simpleType/IntType';
import LongType from './node/simpleType/LongType';
import StringType from './node/simpleType/StringType';
import DateType from './node/simpleType/DateType';
import DateTimeType from './node/simpleType/DateTimeType';
import DecimalType from './node/simpleType/DecimalType';
import BooleanType from './node/simpleType/BooleanType';
import IntegerType from './node/simpleType/IntegerType';
import Base64BinaryType from './node/simpleType/Base64BinaryType';

import Node from './node/Node';
import ComplexType from './node/ComplexType';
import Element from './node/Element';

// TODO В будущем от этого класса надо избавляться. Он никакого отношения к XSD не имеет))
// И каким-то образом надо избавляться от createBaseXsd()

export default class DocumentTypeDefinition {

	/**
	 * Выделить безымянные типы, добавить им имена и добавить их в DTD.
	 *
	 * Проходимся по всем узлам, ищем типы комплексные и безымянные.
	 * Необходимо, чтобы такие типы были оформлены как отдельные модели.
	 * Иначе не будет возможности сослаться на них в Ext.data.field.Field.reference.
	 * http://docs.sencha.com/extjs/6.2.0/classic/Ext.data.field.Field.html#cfg-reference
	 * http://docs.sencha.com/extjs/6.2.0/classic/Ext.data.schema.Reference.html#cfg-type
	 *
	 * Пример такого элемента это SendNotificationsListMPResponse из файла DebtorOperations.xsd
	 *
	 * @param {DocumentTypeDefinition} dtd
	 */
	static findAndAddNonameTypes(dtd: DocumentTypeDefinition) {
		// Вспомогательная рекурсивная функция.
		function findAndAddNonameTypes(node: Node) {
			node.childs.forEach(findAndAddNonameTypes);
			if (node instanceof ComplexType && node.isNoname) {
				// Присваиваем имя (собираем из имен всех предков-элементов).
				node.name = node.ancestors
					.filter(node => node instanceof Element)
					.map(node => (node as Element).name)
					.map(pascalcase)
					.reverse().join('');
				// Далее тип включаем в схему.
				node.xsd.addType(node);
			}
		}
		dtd.schemas.forEach(xsd => {
			xsd.childs.forEach(findAndAddNonameTypes);
		});
	}

	static createBaseXsd(): XmlSchemaDefinition {
		const baseXsd = new XmlSchemaDefinition({
			value: {
				targetNamespace: 'http://www.w3.org/2001/XMLSchema',
				otherAttributes: {
					'{http://www.w3.org/2000/xmlns/}xs': 'http://www.w3.org/2001/XMLSchema',
					targetNamespace: 'http://www.w3.org/2001/XMLSchema'
				}
			}
		}, 'BaseXmlSchemaDefinition');
		baseXsd.types.push(new AutoType(baseXsd));
		baseXsd.types.push(new IntType(baseXsd));
		baseXsd.types.push(new LongType(baseXsd));
		baseXsd.types.push(new StringType(baseXsd));
		baseXsd.types.push(new DateType(baseXsd));
		baseXsd.types.push(new DateTimeType(baseXsd));
		baseXsd.types.push(new DecimalType(baseXsd));
		baseXsd.types.push(new BooleanType(baseXsd));
		baseXsd.types.push(new IntegerType(baseXsd));
		baseXsd.types.push(new Base64BinaryType(baseXsd));
		return baseXsd;
	}

	private xsds: XmlSchemaDefinition[] = [];

	get schemas(): XmlSchemaDefinition[] {
		return this.xsds;
	}

	constructor() {
		this.addXsd(DocumentTypeDefinition.createBaseXsd());
	}

	addXsd(xsd: XmlSchemaDefinition): this {
		xsd.dtd = this;
		this.xsds.push(xsd);
		return this;
	}

	getXsd(namespace: string): XmlSchemaDefinition {
		return this.xsds.find(xsd => xsd.namespace == namespace);
	}

}