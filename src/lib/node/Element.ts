
import * as pascalcase from 'pascalcase';
import * as camelcase from 'camelcase';

import XmlSchemaDefinition from '../XmlSchemaDefinition';

import Node from './Node';
import Type from './Type';
import SimpleType from './simpleType/SimpleType';
import ComplexType from './ComplexType';

export interface IExtFieldConfig {
	name: string;
	type: string;
	mapping?: string;
}

/**
 * Объявляет элемент.
 * https://msdn.microsoft.com/ru-ru/library/ms256118%28v=vs.120%29.aspx?f=255&MSPPError=-2147217396
 */
export default class Element extends Node {

	get name() {
		return this.getAttributeValue('name');
	}

	get xsd(): XmlSchemaDefinition {
		return this.rootNode as XmlSchemaDefinition;
	}

	get path(): string[] {
		return [camelcase(this.xsd.id)];
	}

	get className(): string {
		return pascalcase(this.name);
	}

	private _type: Type;

	get type(): Type {

		if (!this._type) {
			const typeName = this.getAttributeValue('type', 'xs:auto');
			this._type = this.xsd.findType(typeName);
		}

		return this._type;
		// if (this.simple_typeType) return this.simpleType;
		// if (this.complexType) return this.complexType;
		
		

	}

	set type(type: Type) {
		this._type = type;
	}

	get extName(): string {
		return camelcase(this.name);
	}

	get extFieldConfig(): IExtFieldConfig {
		const config: IExtFieldConfig = {
			name: this.extName,
			type: (this.type as SimpleType).rootSimpleType.extName
		};
		if (this.name != this.extName) config.mapping = this.name;
		return config;
	}

	// private simpleType: SimpleType;

	// private complexType: ComplexType;

	get baseComplexType(): ComplexType {
		return this.type instanceof ComplexType ? this.type.baseComplexType : undefined;
	}

	constructor(data: any, ownerNode: Node) {
		super(data, ownerNode);

		if ('simpleType' in data && 'complexType' in data) {
			throw new Error(`Узлы SimpleType и ComplexType объявлены в Element одновременно.`);
		}

		
		let innerType: Type;



		if ('simpleType' in data) innerType = new SimpleType(data.simpleType, this);
		if ('complexType' in data) innerType = new ComplexType(data.complexType, this);

		if (innerType) {
			this.type = innerType;
			// Регистрация дочерних узлов.
			this.childs = this.childs.concat(innerType);
		}
		
		
		

	}

}