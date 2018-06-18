Парсер WSDL-сервиса
===================

Парсер WSDL и XSD файлов для создания ограниченной модели в оперативной памяти на JavaScript и TypeScript.
Предназначен для анализа веб-сервисов, описанных на WSDL.

Парсер основан на коде [Jsonix](Jsonix) и [W3C Schemas](w3c-schemas).

Инсталяция
----------

```bash
npm install wsdl-xsd-parser --save
```


Пример на TypeScript
--------------------

```typescript
import { DocumentTypeDefinition as Dtd, XmlSchemaDefinition as Xsd } from 'wsdl-xsd-parser';
import { Jsonix } from 'jsonix';
import { XSD_1_0 } from 'w3c-schemas';

/**
 * Загрузка XSD-файла в JavaScript-объект.
 * Вспомогательная функция.
 * @param pathToFile
 * @returns {object}
 */
async function loadXsdFile(pathToFile): Promise<object> {
	return await new Promise((resolve, reject) => {
        const context = new Jsonix.Context([XSD_1_0]);
        const unmarshaller = context.createUnmarshaller();
        unmarshaller.unmarshalFile(pathToFile, resolve);
    });
}

(async () => {
	const dtd = new Dtd();
    const xsdJsonData = await loadXsdFile('path/to/xsdfile.xsd');
	const xsd1 = new Xsd(xsdJsonData, 'file-id1');
	dtd.addXsd(xsd1);
})();
``` 



[w3c-schemas]: https://github.com/highsource/w3c-schemas
[Jsonix]: https://github.com/highsource/jsonix