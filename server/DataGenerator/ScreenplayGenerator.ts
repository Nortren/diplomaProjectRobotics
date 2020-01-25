/**
 * @author Стромов А.С.
 * Класс генерации  Stub данных для эмуляции поведения реальных датчиков состояния
 */

export default class ScreenplayGenerator {

    /**
     * Генерация данных по диаграммам датчиков
     * @param numberOfSensors количество диаграмм которые надо с эмулировать
     */
    stubScreenplayGenerator(moveX,moveY,moveCheck,rand) {
        moveCheck++;
        if (rand === 1) {
            if (moveCheck < 180) {
                moveX++;
            }
            if (moveCheck >= 180) {
                moveY--;
                moveX--;
            }
            if (moveCheck >= 180) {
                moveCheck = 0;
                rand++;
            }
        }
        if (rand === 2) {
            if (moveCheck < 50) {
                moveY++;
                moveX++;
            }
            if (moveCheck >= 50) {
                moveY--;
                moveX++;
            }
            if (moveCheck >= 100) {
                moveCheck = 0;
                rand++;
            }
        }
        if (rand === 3) {
            if (moveCheck < 50) {
                moveY--;
                moveX--;
            }
            if (moveCheck >= 50) {
                moveY++;
                moveX++;
            }
            if (moveCheck >= 100) {
                moveCheck = 0;
                rand++;
            }
        }
        if (rand === 4) {
            if (moveCheck < 300) {
                moveX--;
            }

            if (moveCheck >= 300) {
                moveCheck = 0;
                rand=1;
            }
        }


        if(moveX > 400){
            moveX = 50;
        }

        if(moveY > 510){
            moveY = 160;
        }


        let img_src = "src/images/plan.png";
        return {moveX, moveY,moveCheck,rand,img_src};
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
