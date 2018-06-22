import Service from './Service';
import Binding from './Binding';

export default class Port {
	get name(): string {
		return this.portNode.getAttribute('name');
	}
	get binding(): Binding {
		const bindingName = this.portNode.getAttribute('binding');
		return this.service.wsdl.findBinding(bindingName);
	}
	constructor(private portNode: any, private service: Service) {}
	select(xpath: string): any[] {
		return this.service.wsdl.wsdlDocumentSelect(xpath, this.portNode);
	}
}