import WebServiceDefinition from './WebServiceDefinition';
import PortType from './PortType';

export default class Binding {
	get name(): string {
		return this.bindingNode.getAttribute('name');
	}
	get portType(): PortType {
		return this.bindingNode.getAttribute('type');
	}
	constructor(private bindingNode: any, wsdl: WebServiceDefinition) {}
}