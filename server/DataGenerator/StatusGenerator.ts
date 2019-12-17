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
        const name = ['','Заряд', 'Сигнал', 'Дистанция', 'Отклик мс', 'Прочие'];


        const graph = {};
        for (let i = 1; i < numberOfSensors; i++) {
            const graphName = 'stubGraphsName_' + i;
            const graphsData = {};
            let graphsValueName = 'stubGraphsName';
            let graphsValue = 'stubGraphsData';
            graphsData[graphsValueName] = name[i];
            if (i === 2) {
                graphsData[graphsValue] = this.getRandomInt(i * 7, 2);
            }
            if (i === 2) {
                graphsData[graphsValue] = this.getRandomInt(i * 7, 2);
            }
            else if (i === 3) {
                // graphsData[graphsValue] = this.getRandomInt(i * 8,5);
                graphsData[graphsValue] = this.generatorRandomDataNumber(79, 30, 5);
            }
            else {
                graphsData[graphsValue] = this.getRandomInt(i * 15, false);

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
