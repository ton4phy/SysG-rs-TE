// Задача:
    // Создать приложение по переводу значения температуры между градусами цельсия,фаренгейта и кельвина.
// Входящие параметры:
    // Значение температуры вместе с указанием шкалы (цельсий, фаренгейт или кельвин),например: 26С, 299K, или 79F.
// Выходные данные:
    // Целые значения температур в JSON формате для всех шкал измерения, кроме указанной во входящих параметрах,
    // например: {“K”: “299”, “F”: “79F”}

class ConvertTemp { // Класс для создания конвертера температутры
    constructor(value) { // Исходное значение которое необходимо конвертировать
        this.degreesValue = +(value.replace(/\D+/g, "")); // Значение температуры
        this.initialValue = value.slice(-1).toUpperCase(); // Тип исходной температуры
    }

    makeConvert() { // Метод для запуска конвертации и получения результата в JSON-формате
        let convertValue = {}; // Вспомогательный обьект для хранния результата

        // Вспомогательные функции для конвертации температур
        //=====================================================
        const fc = (c) => Math.round(c * (9 / 5) + 32);
        const kc = (c) => Math.round(c + 273.15);
        const cf = (f) => Math.round((f - 32) * (5 / 9));
        const kf = (f) => Math.round((f - 32) * (5 / 9) + 273.15);
        const ck = (k) => Math.round(k - 273.15);
        const fk = (k) => Math.round((k - 273.15) * (9 / 5) + 32);
        //========================================================

        // Конструкция для наполенения обьекта результа данными
        //========================================================
        if (this.initialValue === "C") {
            convertValue["K"] = kc(this.degreesValue);
            convertValue["F"] = fc(this.degreesValue);
        } else if (this.initialValue === "F") {
            convertValue["K"] = kf(this.degreesValue);
            convertValue["C"] = cf(this.degreesValue);
        } else if (this.initialValue === "K") {
            convertValue["F"] = fk(this.degreesValue);
            convertValue["C"] = ck(this.degreesValue);
        } else {
            convertValue["Error"] = "Wrong values";
        }
        //=========================================================
        
        return JSON.stringify(convertValue); // Форматируем результат в JSON-формат и возвращаем его
    };
};

//Примеры использования:
    //let celsius = new ConvertTemp('25C');
    //celsius.makeConvert(); // => '{"K":298,"F":77}'
    
    //let fahrenheit = new ConvertTemp('25F');
    //fahrenheit.makeConvert(); // => '{"K":269,"C":-4}'
    
    //let kelvin = new ConvertTemp('25K');
    //kelvin.makeConvert(); // => '{"F":-415,"C":-248}'

//Алгоритм:
    //1. Принимаем сторку со значением температуры 
    //2. Разбиваем ее на "Значение температуры" и "Тип температуры"
    //3. Пропускаем полученые значения через условные операторы 
    //4. Записываем данные в новый обьект
    //5. Форматируем результат в JSON-формат и возвращаем его
