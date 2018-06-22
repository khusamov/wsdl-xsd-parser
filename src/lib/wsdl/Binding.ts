import WebServiceDefinition from './WebServiceDefinition';
import PortType from './PortType';

export default class Binding {
	get name(): string {
		return this.bindingNode.getAttribute('name');
	}
	get portType(): PortType {
		const portTypeName = this.bindingNode.getAttribute('type');
		return this.wsdl.findPortType(portTypeName);
	}
	constructor(private bindingNode: any, public wsdl: WebServiceDefinition) {}
	select(xpath: string): any[] {
		return this.wsdl.wsdlDocumentSelect(xpath, this.bindingNode);
	}
}