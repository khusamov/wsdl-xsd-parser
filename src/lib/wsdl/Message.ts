import WebServiceDefinition from './WebServiceDefinition';
import Part from './Part';

export default class Message {
	get name(): string {
		return this.inputNode.getAttribute('name');
	}
	get parts(): Part[] {
		return this.select('wsdl:part').map(partNode => new Part(partNode, this));
	}
	constructor(private inputNode: any, public wsdl: WebServiceDefinition) {}
	select(xpath: string): any[] {
		return this.wsdl.wsdlDocumentSelect(xpath, this.inputNode);
	}
}