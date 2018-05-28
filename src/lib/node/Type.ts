
import * as pascalcase from 'pascalcase';
import * as camelcase from 'camelcase';

import XmlSchemaDefinition from '../XmlSchemaDefinition';
import Node from './Node';

export default class Type extends Node {

	get xsd(): XmlSchemaDefinition {
		return this.rootNode as XmlSchemaDefinition;
	}

	get path(): string[] {
		return [camelcase(this.xsd.id), 'type'];
	}

	get className(): string {
		return this.name ? `T${pascalcase(this.name)}` : undefined;
	}

	get isNoname(): boolean {
		return !this.name;
	}

	name: string;

	// get name(): string {
	// 	return this.getAttributeValue('name');
	// }

	// get extName(): string {
	// 	return camelcase(this.name);
	// }

	constructor(data: any, ownerNode: Node) {
		super(data, ownerNode);
		this.name = this.getAttributeValue('name');
	}

}