import * as Util from "util";
import * as Fs from "fs";
// import { Jsonix } from 'jsonix';
// import { WSDL_1_1 } from './WSDL_1_1';
import { DOMParser } from 'xmldom';
import * as XPath from 'xpath';
import Service from './Service';

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
 */
export default class WebServicesDescription {
	private wsdlDocument: any;
	wsdlDocumentSelect: Function;
	services: Service[] = [];

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



		// Загружаем службы.
		this.services = this.select('/wsdl:definitions/wsdl:service').map(serviceNode => new Service(serviceNode, this));

		// const importNodes = this.select('//xsd:import');
		// console.log(importNodes.map(importNode => ({
		// 	namespace: importNode.getAttribute('namespace'),
		// 	schemaLocation: importNode.getAttribute('schemaLocation')
		// })));

		return this;
	}

	private select(xpath: string): any[] {
		return this.wsdlDocumentSelect(xpath, this.wsdlDocument);
	}
}