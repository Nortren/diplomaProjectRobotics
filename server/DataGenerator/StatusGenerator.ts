/**
 * @author Стромов А.С.
 * Класс генерации  Stub данных для эмуляции поведения реальных датчиков состояния
 */

export default class StatusGenerator {

    /**
     * Генерация данных по диаграммам датчиков
     * @param numberOfSensors количество диаграмм которые надо с эмулировать
     */
    stubDataGraphsGenerator(numberOfSensors: number) {
        const name = ['', 'Заряд', 'Сигнал', 'Дистанция', 'Отклик мс', 'Кислород'];


        const graph = {};

        for (let i = 1; i < numberOfSensors; i++) {
            const graphName = 'stubGraphsName_' + i;
            const graphsData = {};
            let graphsValueName = 'stubGraphsName';
            let graphsValue = 'stubGraphsData';
            let graphsStartValue = 'startValue';
            let graphsMaxValue = 'maxValue';
            /*Значение которое должно снижаться
            логика такая, значала
            */
            // let revertValue()

            let dataTestValue = 90;


            setInterval(() => {
                dataTestValue--
            }, 1000);

            graphsData[graphsValueName] = name[i];
            if (i === 1) {
                graphsData[graphsValue] = this.getRandomInt(i * 300, false);
                graphsData[graphsStartValue] = 40 + new Date().getSeconds();
                graphsData[graphsMaxValue] = 100;
            }
            if (i === 2) {
                graphsData[graphsValue] = this.getRandomInt(i * -170, false);
                graphsData[graphsStartValue] = 1000 - new Date().getSeconds()*10;
                graphsData[graphsMaxValue] = 1000;
            }
            if (i === 3) {
                if(new Date().getSeconds() > 30){
                    graphsData[graphsStartValue] = 3000 - new Date().getSeconds()*45;
                }else {
                    graphsData[graphsStartValue] = 3000 + new Date().getSeconds()*25;
                }
                graphsData[graphsValue] = this.getRandomInt(i * 300, false);

                graphsData[graphsMaxValue] = 3000;
            }
            if (i === 4) {
                graphsData[graphsValue] = this.getRandomInt(i * 300, false);
                graphsData[graphsStartValue] = 60 - new Date().getSeconds();
                graphsData[graphsMaxValue] = 60;
            }
            if (i === 5) {
                graphsData[graphsValue] = this.getRandomInt(i * 300, false);
                graphsData[graphsStartValue] = 240 - new Date().getSeconds();
                graphsData[graphsMaxValue] = 300;
            }
            else {
                graphsData[graphsValue] = this.getRandomInt(i * 300, 4);

            }

            graph[graphName] = graphsData;
        }

        return graph;
    }

    /**
     * генерация массива случайных чисел
     * @param lengthArray количество сгенерированных данных
     * @param diapasonNumber в каком диапазоне будут генерироваться числа для массива(максимальное значение)
     * @returns {Array}
     */
    generatorRandomDataNumber(lengthArray, diapasonNumber, delay) {
        const dataArray = [];
        for (let i = 0; i < lengthArray; i++) {
            dataArray.push(this.getRandomInt(diapasonNumber, delay));
        }
        return dataArray;
    }


    /**
     *  генерация случайного числа
     * @param max
     * @param delay задержка для правдоподобной эмуляции данных
     */


    getRandomInt(max, delay) {
        let resultNumber = Math.floor(Math.random() * Math.floor(max));
        if (delay && resultNumber % delay === 0) {
            resultNumber = null;
        }
        return resultNumber;
    }

}
// const generator = new Generator();
// generator.stubDataGraphsGenerator(5);
