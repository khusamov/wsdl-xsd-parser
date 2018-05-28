

Попробовать использовать модуль чтения WSDL-файлов:
https://www.npmjs.com/package/apiconnect-wsdl


Выделить в отдельный модуль генератор классов ExtJS.

Сделать дополнительную функцию: 
Добавление дополнительного кода в классы
Сейчас придется в определенные классы вставлять: proxy: { serviceMethod: "getDebtorsBySearchParams" }

Создание CLI-интерфейса конвертера.

Создание NPM-модуля для данного конвертера.

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 

Сделать генерацию модуля ExtJS целиком. 
На основе шаблона. Шаблон можно внешний так и внутренний использовать.
Также должна быть возможность добавлять туда дополнительные классы, например базовые модели.

Добавлять комментарии в typeProperty, чтобы было понятно, какие именно дочерние классы могут подключаться.

Если есть наследование модели, то нужно пройтись по предкам и собрать список полей.
Эти поля нужно исключить в производном классе.

Сделать отслеживание повторов в секции requires модели.

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 

Проблема рекурсивной зависимости пока решена открытием секции USES.
[WRN] C1009: Circular reference in requirements chain (
C:\@repositories\pir-model-preparer-test\packages\local\pir-server\src\model\baseModel\type\TMassOperation.js:12 [ClassRequire] ->
C:\@repositories\pir-model-preparer-test\packages\local\pir-server\src\model\baseModel\type\TMassOperationProtocol.js:3 [ClassRequire] ->
C:\@repositories\pir-model-preparer-test\packages\local\pir-server\src\model\baseModel\type\TMassOperationProtocolItem.js:26 [ClassRequire] ->
C:\@repositories\pir-model-preparer-test\packages\local\pir-server\src\model\debtorInformation\type\TGetMassOperationDetailsByIdResponse.js:3 [ClassRequire] ->
C:\@repositories\pir-model-preparer-test\packages\local\pir-server\src\model\debtorInformation\type\TGetMassOperationDetailsByIdResult.js:3 [ClassRequire] ->
C:\@repositories\pir-model-preparer-test\packages\local\pir-server\src\model\baseModel\type\TMassOperation.js
) -- unknown-file:-1