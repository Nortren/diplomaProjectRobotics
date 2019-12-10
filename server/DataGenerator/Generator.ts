/**
 * @author Стромов А.С.
 * Класс генерации  Stub данных для эмуляции поведения реальных датчиков и устройств
 */

export default class Generator {

    /**
     * Генерация данных по графикам датчиков и приборов учета
     * @param numberOfSensors количество графиков которые надо с эмулировать
     */
    stubDataGraphsGenerator(numberOfSensors: number) {
        const graph = {};
        for (let i = 1; i < numberOfSensors; i++) {
            const graphName =  'stubGraphsName_' + i;
            const graphsData = {};
            let graphsValue = 'stubGraphsData';
            let maxValue = 'maxValueGraphs';
            graphsData[graphsValue] = this.generatorRandomDataNumber(10, i * 10);
            graphsData[maxValue] = this.maxDataNumber(graphsData[graphsValue]);
            graph[graphName] = graphsData;
        }

        return graph;
    }

    /**
     * генерация массива случайных чисел
     * @param lengthArray
     * @param diapasonNumber в каком диапазоне будут генерироваться числа для массива(максимальное значение)
     * @returns {Array}
     */
    generatorRandomDataNumber(lengthArray, diapasonNumber) {
        const dataArray = [];
        for (let i = 0; i < lengthArray; i++) {
            dataArray.push(this.getRandomInt(diapasonNumber));
        }
        return dataArray;
    }

    /**
     * Нахождение максимального числа в массиве
     * @param arrayData
     * @returns {any}
     */
    maxDataNumber(arrayData) {
        let min = arrayData[0];
        let max = min;
        for (let i = 1; i < arrayData.length; ++i) {
            if (arrayData[i] > max) max = arrayData[i];
            if (arrayData[i] < min) min = arrayData[i];
        }
        return max;
    }

    /**
     * генерация случайного числа
     * @param max
     * @returns {number}
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

}
// const generator = new Generator();
// generator.stubDataGraphsGenerator(5);
