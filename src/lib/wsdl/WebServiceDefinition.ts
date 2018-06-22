import * as Util from "util";
import * as Fs from "fs";
// import { Jsonix } from 'jsonix';
// import { WSDL_1_1 } from './WSDL_1_1';
import { DOMParser } from 'xmldom';
import * as XPath from 'xpath';
import Service from './Service';
import Binding from './Binding';
import PortType from './PortType';
import Message from './Message';

const readFile = Util.promisify(Fs.readFile);

/**
 * Чтение WSDL-файла и конвертация в JSON-объект.
 * Вспомогательная функция.
 * @param {string} filePath
 * @returns {Promise<any>}
 * TODO Определится как будем получать доступ к XML: через Jsonix+WSDL_1_1 или XPath+DOMParser.
 */
// async function loadWsdlFile(filePath: string): Promise<any> {
// 	const context = new Jsonix.Context([WSDL_1_1]);
// 	const unmarshaller = context.createUnmarshaller();
// 	return await new Promise((resolve, reject) => {
// 		unmarshaller.unmarshalFile(filePath, resolve);
// 	});
// }

/**
 * Подготовка объекта с пространствами имен и их префиксами.
 * @param {string} namespaces
 * @returns {object}
 */
function prepareNamespaces(namespaces: string): {[prefix: string]: string} {
	return (
		namespaces
			.split('\n').map(s => s.trim()).filter(s => s)
			.map(s => s.replace('xmlns:', '').replace(/"/g, ''))
			.map(s => ({
				prefix: s.split('=')[0],
				namespace: s.split('=')[1]
			})).reduce((result, ns) => {
				result[ns.prefix] = ns.namespace;
				return result;
			}, {})
	);
}

/**
 * Чтение и парсинг WSDL-файлов.
 * Поддерживается версия 1.1.
 */
export default class WebServiceDefinition {
	private wsdlDocument: any;
	wsdlDocumentSelect: Function;

	get services(): Service[] {
		return this.select('/wsdl:definitions/wsdl:service').map(serviceNode => new Service(serviceNode, this));
	}

	namespaces: {[prefix: string]: string} = prepareNamespaces(`
		xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
		xmlns:wsp="http://www.w3.org/ns/ws-policy" 
		xmlns:tns="http://bailiffOffice.adapter.eirc.mos.ru" 
		xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
		xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
		xmlns:dom="http://domainmodel.eirc.mos.ru/model" 
		xmlns:core="http://domainmodel.eirc.mos.ru/core" 
		xmlns:agreement="http://domainmodel.eirc.mos.ru/model/agreement" 
		xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" 
		xmlns:ns="http://bailiffOffice.adapter.eirc.mos.ru/model"
	`);

	constructor() {
		this.wsdlDocumentSelect = XPath.useNamespaces(this.namespaces);
	}

	async load(filePath: string): Promise<this> {
		const wsdlFileContent = await readFile(filePath, {encoding: 'utf8'});
		this.wsdlDocument = new DOMParser().parseFromString(wsdlFileContent);

		// console.log(
		// 	'//wsdl:portType/wsdl:documentation',
		// 	this.select('string(//wsdl:portType/wsdl:documentation)')
		// )


		// const importNodes = this.select('//xsd:import');
		// console.log(importNodes.map(importNode => ({
		// 	namespace: importNode.getAttribute('namespace'),
		// 	schemaLocation: importNode.getAttribute('schemaLocation')
		// })));

		return this;
	}

	select(xpath: string): any {
		return this.wsdlDocumentSelect(xpath, this.wsdlDocument);
	}

	findBinding(bindingName: string): Binding {
		if (bindingName.split(':')[0] !== 'tns') throw new Error(`Имя ${bindingName} содержит неизвестный префикс.`);
		bindingName = bindingName.split(':')[1];
		const bindingNode = this.select(`/wsdl:definitions/wsdl:binding[@name='${bindingName}']`)[0];
		return new Binding(bindingNode, this);
	}

	findPortType(portTypeName: string): PortType {
		if (portTypeName.split(':')[0] !== 'tns') throw new Error(`Имя ${portTypeName} содержит неизвестный префикс.`);
		portTypeName = portTypeName.split(':')[1];
		const portTypeNode = this.select(`/wsdl:definitions/wsdl:portType[@name='${portTypeName}']`)[0];
		return new PortType(portTypeNode, this);
	}

	findMessage(messageName: string): Message {
		if (messageName.split(':')[0] !== 'tns') throw new Error(`Имя ${messageName} содержит неизвестный префикс.`);
		messageName = messageName.split(':')[1];
		const messageNode = this.select(`/wsdl:definitions/wsdl:message[@name='${messageName}']`)[0];
		return new Message(messageNode, this);
	}
}