import Message from './Message';

export default class Part {
	get name(): string {
		return this.partNode.getAttribute('name');
	}
	get elementLink(): string {
		return this.partNode.getAttribute('element');
	}
	constructor(private partNode: any, public message: Message) {}
	select(xpath: string): any[] {
		return this.message.wsdl.wsdlDocumentSelect(xpath, this.partNode);
	}
}