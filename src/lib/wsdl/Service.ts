import WebServicesDescription from './WebServicesDescription';
import PortType from './PortType';

export default class Service {
	ports: PortType[] = [];
	get name(): string {
		return this.serviceNode.getAttribute('name');
	}
	constructor(private serviceNode: any, public wsdl: WebServicesDescription) {
		this.ports = this.select('wsdl:port').map(portNode => new PortType(portNode, this));
	}
	private select(xpath: string): any[] {
		return this.wsdl.wsdlDocumentSelect(xpath, this.serviceNode);
	}
}