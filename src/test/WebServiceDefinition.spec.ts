import * as Path from 'path';
import * as Fs from 'fs';
import * as Util from 'util';
import MakeDir = require('mkdirp-promise');
import * as CircularJson from 'circular-json';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Wsdl } from '../';

const readdir = Util.promisify(Fs.readdir);
const writeFile = Util.promisify(Fs.writeFile);
const stat = Util.promisify(Fs.stat);

/**
 * Создать список WSDL-файлов из директории.
 * @param {string} dirPath
 * @returns {string[]}
 */
async function createWsdlPathList(dirPath: string): Promise<string[]> {
	let result: string[] = [];
	for (let fileName of await readdir(dirPath)) {
		const filePath = Path.join(dirPath, fileName);
		if (fileName.indexOf('.wsdl') !== -1) result.push(filePath);
		if ((await stat(filePath)).isDirectory()) result = result.concat(await createWsdlPathList(filePath));
	}
	return result;
}

describe('WebServiceDefinition', function() {
	it('wsdl/Adapters/BailiffOfficeAdapter.wsdl', async function() {
		const wsdl = await new Wsdl().load(Path.join(__dirname, 'wsdl/Adapters/BailiffOfficeAdapter.wsdl'));
		assert.deepEqual(wsdl.services.map(service => service.name), ['BailiffOfficeAdapterService']);

		// definitions
		//     service
		//         ports -> port
		//             binding
		//                 portType
		//                     documentation
		//                     operations -> operation
		//                         name
		//                         documentation
		//                         input
		//                             message
		//                         output
		//                             message
		//                                 name
		//                                 parts -> part
		//                                     name
		//                                     elementLink

		assert.deepEqual(wsdl.services.map(service => ({
			name: service.name,
			ports: service.ports.map(port => ({
				name: port.name,
				documentation: port.binding.portType.documentation,
				operations: port.binding.portType.operations.map(operation => ({
					name: operation.name,
					documentation: operation.documentation,
					inputMessagePartElementLinks: operation.input ? operation.input.message.parts.map(part => part.elementLink) : [],
					outputMessagePartElementLinks: operation.output ? operation.output.message.parts.map(part => part.elementLink) : []
				}))
			}))
		})), [
			{
				"name": "BailiffOfficeAdapterService",
				"ports": [
					{
						"name": "BailiffOfficeAdapterPort",
						"documentation": "Служба для проксирования вызовов из внутренних систем АСУ ЕИРЦ к сервисам ФСПП. ",
						"operations": [
							{
								"name": "GetDebtsByIspDoc",
								"documentation": "Метод получения из ФСПП информации о задолженностях по дате и номеру исполнительного документа",
								"inputMessagePartElementLinks": [
									"tns:GetDebtsByIspDocRequest"
								],
								"outputMessagePartElementLinks": [
									"tns:GetDebtsByIspDocResponse"
								]
							},
							{
								"name": "GetDebtsByIpNumber",
								"documentation": "Метод получения информации о задолженностях по номеру исполнительного производства",
								"inputMessagePartElementLinks": [
									"tns:GetDebtsByIpNumberRequest"
								],
								"outputMessagePartElementLinks": [
									"tns:GetDebtsByIpNumberResponse"
								]
							},
							{
								"name": "GetDebtsByUinOiv",
								"documentation": "Метод пакетного получения информации о задолженностях по списку УИН Внешнего контрагента",
								"inputMessagePartElementLinks": [
									"tns:GetDebtsByUinOivRequest"
								],
								"outputMessagePartElementLinks": [
									"tns:GetDebtsByUinOivResponse"
								]
							}
						]
					}
				]
			}
		]);


	});
	it('wsdl/ExternalCallback/CallbackService.wsdl', async function() {
		const wsdl = await new Wsdl().load(Path.join(__dirname, 'wsdl/ExternalCallback/CallbackService.wsdl'));
		assert.deepEqual(wsdl.services.map(service => service.name), ['CallbackService']);
		assert.deepEqual(wsdl.services.map(service => ({
			name: service.name,
			ports: service.ports.map(port => ({
				name: port.name,
				documentation: port.binding.portType.documentation,
				operations: port.binding.portType.operations.map(operation => ({
					name: operation.name,
					documentation: operation.documentation,
					inputMessagePartElementLinks: operation.input ? operation.input.message.parts.map(part => part.elementLink) : [],
					outputMessagePartElementLinks: operation.output ? operation.output.message.parts.map(part => part.elementLink) : []
				}))
			}))
		})), [
			{
				"name": "CallbackService",
				"ports": [
					{
						"documentation": "Служба callback-методов",
						"name": "CallbackServicePort",
						"operations": [
							{
								"documentation": "Универсальный callback-метод",
								"inputMessagePartElementLinks": [
									"tns:UniversalCallbackRequest"
								],
								"name": "UniversalCallback",
								"outputMessagePartElementLinks": []
							}
						]
					}
				]
			}
		]);


	});
});



// describe('WebServiceDefinition', function() {
// 	it('WebServiceDefinition', async function() {
// 		for (let wsdlFilePath of await createWsdlPathList(Path.join(__dirname, 'wsdl'))) {
// 			const wsdl = await new WebServiceDefinition().load(wsdlFilePath);
// 			wsdlFilePath = wsdlFilePath.replace('\\wsdl\\', '\\wsdl2json\\').replace('.wsdl', '.json');
// 			await MakeDir(Path.dirname(wsdlFilePath));
// 			await writeFile(wsdlFilePath, CircularJson.stringify(wsdl.rawData, null, 2));
// 		}
// 	});
// });

