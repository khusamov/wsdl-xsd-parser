import Message from './Message';

export default class Part {
	constructor(private partNode: any, public message: Message) {}
	select(xpath: string): any[] {
		return this.message.wsdl.wsdlDocumentSelect(xpath, this.partNode);
	}
}