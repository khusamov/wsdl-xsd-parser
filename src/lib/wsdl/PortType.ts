import Service from './Service';

export default class PortType {
	get documentation(): string {
		return this.select('documentation')[0].nodeValue;
	}
	constructor(private portTypeNode: any, private service: Service) {}
	private select(xpath: string): any[] {
		return this.service.wsdl.wsdlDocumentSelect(xpath, this.portTypeNode);
	}
}