import Operation from './Operation';
import Message from './Message';

export default class Input {
	get message(): Message {
		const messageName = this.inputNode.getAttribute('message');
		return this.operation.portType.wsdl.findMessage(messageName);
	}
	constructor(private inputNode: any, public operation: Operation) {}
	select(xpath: string): any[] {
		return this.operation.portType.wsdl.wsdlDocumentSelect(xpath, this.inputNode);
	}
}