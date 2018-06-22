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
	get input(): Input {
		return new Input(this.select('wsdl:input')[0], this);
	}
	get output(): Output {
		return new Output(this.select('wsdl:output')[0], this);
	}
	constructor(private operationNode: any, public portType: PortType) {}
	select(xpath: string): any {
		return this.portType.wsdl.wsdlDocumentSelect(xpath, this.operationNode);
	}
}