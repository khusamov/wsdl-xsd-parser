import Service from './Service';
import Binding from './Binding';
import WebServiceDefinition from './WebServiceDefinition';
import Operation from './Operation';

export default class PortType {
	get name(): string {
		return this.portTypeNode.getAttribute('name');
	}
	get documentation(): string {
		return this.select('string(wsdl:documentation)');
	}
	get operations(): Operation[] {
		return this.select('wsdl:operation').map(operationNode => new Operation(operationNode, this));
	}
	constructor(private portTypeNode: any, public wsdl: WebServiceDefinition) {}
	select(xpath: string): any {
		return this.wsdl.wsdlDocumentSelect(xpath, this.portTypeNode);
	}
}