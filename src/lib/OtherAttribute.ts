
export default class OtherAttribute {

	private xmlns = 'http://www.w3.org/2000/xmlns'

	get prefix() {
		return this.name.split('}')[1];
	}

	get isNamespace() {
		return this.name.indexOf(this.xmlns) != -1;
	}

	constructor(public name: string, public value: string, private owner: any) {}

}