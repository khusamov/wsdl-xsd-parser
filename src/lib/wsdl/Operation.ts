import PortType from './PortType';
import Input from './Input';
import Output from './Output';

export default class Operation {
	get input(): Input {
		return new Input(this.select('wsdl:input'), this);
	}
	get output(): Output {
		return new Output(this.select('wsdl:output'), this);
	}
	get documentation(): string {
		return this.select('wsdl:documentation')[0].nodeValue;
	}
	constructor(private operationNode: any, public portType: PortType) {}
	select(xpath: string): any[] {
		return this.portType.wsdl.wsdlDocumentSelect(xpath, this.operationNode);
	}
}