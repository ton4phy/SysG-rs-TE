//Задача:
    //Вам необходимо создать приложение для автоматизации работы погрузочных кранов,
    //позволяющих перемещать плиты между грузовыми автомобилями на крупной
    //строительной площадке.
    //Приложение должно предоставлять кранам последовательность разгрузки, оптимальную
    //для переноса груза с автомобиля на автомобиль, учитывая следующее:
        //● плиты размещаются на автомобилях одна над другой (от 3 до 8 штук в высоту), и
            //отсортированы по весу (от тяжелых - снизу, к легким - сверху)
        //● кран может снимать и перемещать только самую верхнюю плиту с грузовика, и при
            //разгрузке не может устанавливать более тяжелые плиты на более легкие
        //● перенос груза с загруженного автомобиля на пустой нужно осуществить используя
            //только одно дополнительное место для временного хранения плит
//Входящие параметры:
    //Количество плит на автомобиле, который требуется разгрузить (от 3 до 8)
//Выходные данные:
    //Стратегия перемещения плит с автомобиля на автомобиль:
        //● #1 slot_a -> slot_c
        //● #2 slot_a -> slot_b
        //● #1 slot_c -> slot_b
        //● ...
    //где: 
        // slot_a - разгружаемый автомобиль,
        // slot_b - дополнительное место для промежуточного хранения плит, 
        // slot c - пустой автомобиль, куда нужно перенести весьгруз, 
        // #n     - номер перемещаемой плиты.

class PlanForCrane { // Класс для создания плана автоматизации погрузочных кранов
    constructor(numberOfPlates) { // Исходное значение кол-ва плит
        this.numberOfPlates = +('' + numberOfPlates).replace(/\D+/g, "");
    } // Значение кол-ва плит в типе данных Number
    createPlan() {
        
        // Конструкция для проверки корректности данных
        //============================================================
        if(this.numberOfPlates < 3 || this.numberOfPlates > 8 || !isFinite(this.numberOfPlates) || isNaN(parseFloat(this.numberOfPlates))){
            return "Incorrect value!";
        } 
        //============================================================
        
        // Конструкция для расчета плана с использованием рекрусии
        //============================================================
        let [car, empyArea, empyCar, plan] = ["slot_a", "slot_b", "slot_c", []]; // Создание переменных для работы функции
        const startCreate = (q, f = car, t = empyCar, b = empyArea) => {
            if (q <= 0) return;
            startCreate(q - 1, f, b, t);
            plan.push("#" + q + " " + f + " -> " + t);
            startCreate(q - 1, b, t, f);
            return plan;
        };
        //============================================================
        
        return startCreate(this.numberOfPlates); // Выводим результат 
    };
};


//Примеры использования:
    //let firstCarPlan = new PlanForCrane('3');
    //firstCarPlan.createPlan(); => 
                                  //[ '#1 slot_a -> slot_c',
                                    //'#2 slot_a -> slot_b',
                                    //'#1 slot_c -> slot_b',
                                    //'#3 slot_a -> slot_c',
                                    //'#1 slot_b -> slot_a',
                                    //'#2 slot_b -> slot_c',
                                    //'#1 slot_a -> slot_c' ]

//Алгоритм:
//     Использовал алгоритм Хенойской башни:
//                 +-----------------+ 
//                 |    Алгоритм     | --------  q   - Количесво плит
//                 +-----------------+        from   - Машина с плитами
//                         |                    to   - Пустая машина
//                        \|/                  buf   - Свободное место
//          Да        +---------+
//    +---------------|  q = 0  |
//    |               +---------+
//    |                    |    Нет
//    |                   \|/  
//    |           +-------------------+
//    |           |      q = q - 1    |
//    |           |   form = from     |
//    |           |     to = buf      |    
//    |           |    buf = t        |
//    |           +-------------------+
//    |                    |
//    |                   \|/                   
//    |   +-------------------------------------+
//    |   |  Передвигаем плиту (q) c from на to |
//    |   +-------------------------------------+
//    |                    |
//    |                   \|/
//    |           +-------------------+
//    |           |      q = q - 1    |
//    |           |   form = buf      |
//    |           |     to = to       |    
//    |           |    buf = from     |
//    |           +-------------------+
//    |                    |
//    |                   \|/  
//    |           +-----------------+
//    +---------> |      Финиш      |
//                +-----------------+