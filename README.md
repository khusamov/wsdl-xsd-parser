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
import { XsdGroup, Xsd } from 'wsdl-xsd-parser';

(async () => {
	const xsdGroup = new XsdGroup();
	xsdGroup.addXsd(Xsd.load('file-id1', 'path/to/xsdfile.xsd'));
})();
``` 



[w3c-schemas]: https://github.com/highsource/w3c-schemas
[Jsonix]: https://github.com/highsource/jsonix