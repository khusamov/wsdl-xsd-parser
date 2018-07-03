
import * as _ from 'lodash';

import OtherAttribute from '../OtherAttribute';

export default class Node {

	protected otherAttributes: OtherAttribute[] = [];

	get nodeTypeName(): string {
		return this.data.TYPE_NAME;
	}

	get path(): string[] {
		return [];
	}

	get className(): string {
		return '';
	}

	get rootNode(): Node {
		return this.ownerNode ? (this.ownerNode.rootNode ? this.ownerNode.rootNode : this.ownerNode) : undefined;
	}

	get ancestors(): Node[] {
		let result: Node[] = [];
		if (this.ownerNode) result = [this.ownerNode].concat(this.ownerNode.ancestors);
		return result;
	}

	childs: Node[] = [];

	constructor(protected data: any, public ownerNode?: Node) {
		if (_.isEmpty(this.data)) throw new Error('Попытка создать пустой узел.');
		if ('otherAttributes' in data) for (let otherAttribute in data.otherAttributes) {
			this.otherAttributes.push(new OtherAttribute(
				otherAttribute, 
				data.otherAttributes[otherAttribute], 
				this
			));
		}
	}

	public hasAttribute(name: string): boolean {
		return !!this.otherAttributes.find(a => a.name == name);
	}

	public getAttribute(name: string): OtherAttribute {
		const otherAttribute = this.otherAttributes.find(a => a.name == name);
		//if (!otherAttribute) throw new AttributeNotFoundError(name, this);
		return otherAttribute;
	}

	public getAttributeValue(name: string, defaultValue?: string): string {
		const result = this.hasAttribute(name) ? this.getAttribute(name).value : undefined;
		return result == undefined ? defaultValue : result;
	}

	protected getAttributePrefixByValue(value: string): string {
		return this.otherAttributes.find(a => a.value == value).prefix;
	}

}