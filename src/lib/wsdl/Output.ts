import Operation from './Operation';
import Message from './Message';

export default class Output {
	get message(): Message {
		const messageName = this.outputNode.getAttribute('message');
		return this.operation.portType.wsdl.findMessage(messageName);
	}
	constructor(private outputNode: any, public operation: Operation) {}
	select(xpath: string): any[] {
		return this.operation.portType.wsdl.wsdlDocumentSelect(xpath, this.outputNode);
	}
}