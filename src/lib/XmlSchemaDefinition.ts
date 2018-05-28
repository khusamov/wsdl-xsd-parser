
import * as camelcase from 'camelcase';

import DocumentTypeDefinition from './DocumentTypeDefinition';
import OtherAttribute from './OtherAttribute';
//import Model from './model/Model';
import Type from './node/Type';
import SimpleType from './node/simpleType/SimpleType';
import ComplexType from './node/ComplexType';
import Node from './node/Node';
import Namespace from './Namespace';
import Element from './node/Element';

export default class XmlSchemaDefinition extends Node {

	protected namespaces: Namespace[] = [];

	types: Type[] = [];

	elements: Element[] = [];

	// get models(): Model[] {
	// 	return (
	// 		this.types
	// 			.filter(t => t instanceof ComplexType)
	// 			.map(type => new Model(type))
	// 			.concat(this.elements.map(element => new Model(element)))
	// 	);
	// }

	get namespace(): string {
		return this.getAttributeValue('targetNamespace');
	}

	private get prefix(): string {
		return this.getAttributePrefixByValue(this.namespace);
	}

	public dtd: DocumentTypeDefinition;

	constructor(data: any, public id: string) {
		super(data.value);
		const v = data.value;
		this.namespaces = Namespace.findNamespacesFromOtherAttributes(this.otherAttributes);
		if ('simpleType' in v) this.types = this.types.concat(v.simpleType.map(t => new SimpleType(t, this)));
		if ('complexType' in v) this.types = this.types.concat(v.complexType.map(t => new ComplexType(t, this)));
		if ('element' in v) this.elements = this.elements.concat(v.element.map(el => new Element(el, this)));

		// Регистрация дочерних узлов.
		if (this.types) this.childs = this.childs.concat(this.types);
		if (this.elements) this.childs = this.childs.concat(this.elements);

	}

	findType(fullName: string, TypeClass?: typeof ComplexType): ComplexType
	findType(fullName: string, TypeClass?: typeof SimpleType): SimpleType
	findType(fullName: string, TypeClass?: typeof Type): Type {
		const [prefix, name] = fullName.split(':');
		TypeClass = TypeClass ? TypeClass : Type;
		let searchType;

		let xsd: XmlSchemaDefinition = this;
		if (prefix != this.prefix) {
			let namespace = this.namespaces.find(ns => ns.prefix == prefix).namespace
			xsd = this.dtd.getXsd(namespace);
		}
		searchType = xsd.types.find(t => t.name == name && t instanceof TypeClass);


		if (!searchType) throw new Error(`Не найден тип '${fullName}' в схеме XSD '${this.namespace}'.`);
		return searchType;
	}

	addType(type: Type): this {
		this.types.push(type);
		return this;
	}

}