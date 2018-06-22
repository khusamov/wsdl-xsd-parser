import WebServiceDefinition from './WebServiceDefinition';
import Port from './Port';

export default class Service {
	get ports(): Port[] {
		return this.select('wsdl:port').map(portNode => new Port(portNode, this));
	}
	get name(): string {
		return this.serviceNode.getAttribute('name');
	}
	constructor(private serviceNode: any, public wsdl: WebServiceDefinition) {}
	private select(xpath: string): any[] {
		return this.wsdl.wsdlDocumentSelect(xpath, this.serviceNode);
	}
}