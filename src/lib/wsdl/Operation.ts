import PortType from './PortType';
import Input from './Input';
import Output from './Output';

export default class Operation {
	get name(): string {
		return this.operationNode.getAttribute('name');
	}
	get documentation(): string {
		return this.select('string(wsdl:documentation)');
	}
	get input(): Input | undefined {
		const inputNode = this.select('wsdl:input')[0];
		return inputNode ? new Input(inputNode, this) : undefined;
	}
	get output(): Output | undefined {
		const outputNode = this.select('wsdl:output')[0];
		return outputNode ? new Output(outputNode, this) : undefined;
	}
	constructor(private operationNode: any, public portType: PortType) {}
	select(xpath: string): any {
		return this.portType.wsdl.wsdlDocumentSelect(xpath, this.operationNode);
	}
}