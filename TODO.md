TODO
====

Перенести сюда чтение XML и его парсинг

	/**
	 * Загрузить один XSD-файл.
	 * Загружает XML-файл, парсит при помощи Jsonix в JSON-формат.
	 * Файл превращает в XmlSchemaDefinition, а также сохраняет для контроля процесса 
	 * обработки в файл, если указана опция config.dirs.output.json.
	 * @param pathToFile 
	 * @param filename 
	 */
	private processXsdFile(pathToFile, filename): Promise<XmlSchemaDefinition> {
		var context = new Jsonix.Context([XSD_1_0]);
		var unmarshaller = context.createUnmarshaller();
		return new Promise((resolve, reject) => {
			unmarshaller.unmarshalFile(pathToFile, xsdJson => {
				if (this.config.dirs.output.json) {
					const resultFileName = Path.basename(pathToFile, Path.extname(pathToFile)) + '.json';
					const outputJsonDir = Path.join(this.configFileDir, this.config.dirs.output.json);
					const resultFilePath = Path.join(outputJsonDir, resultFileName);
					Fs.writeFileSync(resultFilePath, JSON.stringify(xsdJson, null, 2));
				}
				const id = Path.basename(filename, Path.extname(filename));
				resolve(new XmlSchemaDefinition(xsdJson, id));
			});
		});
	}


— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 



Попробовать использовать модуль чтения WSDL-файлов:
https://www.npmjs.com/package/apiconnect-wsdl
Похоже этот код не совсем по теме... точнее совсем не по теме...
Откуда этот бред вообще взялся?


— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 



— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 

