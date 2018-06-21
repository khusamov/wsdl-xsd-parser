import * as Path from 'path';
import * as Fs from 'fs';
import * as Util from 'util';
import MakeDir = require('mkdirp-promise');
import * as CircularJson from 'circular-json';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { WebServicesDescription } from '../';

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

describe('WebServicesDescription', function() {
	it('WebServicesDescription', async function() {
		const wsdl = await new WebServicesDescription().load(Path.join(__dirname, 'wsdl/Adapters/BailiffOfficeAdapter.wsdl'));
		assert.deepEqual(wsdl.services.map(service => service.name), ['BailiffOfficeAdapterService']);
	});
});

// describe('WebServicesDescription', function() {
// 	it('WebServicesDescription', async function() {
// 		for (let wsdlFilePath of await createWsdlPathList(Path.join(__dirname, 'wsdl'))) {
// 			const wsdl = await new WebServicesDescription().load(wsdlFilePath);
// 			wsdlFilePath = wsdlFilePath.replace('\\wsdl\\', '\\wsdl2json\\').replace('.wsdl', '.json');
// 			await MakeDir(Path.dirname(wsdlFilePath));
// 			await writeFile(wsdlFilePath, CircularJson.stringify(wsdl.rawData, null, 2));
// 		}
// 	});
// });

