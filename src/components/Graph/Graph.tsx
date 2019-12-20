import * as React from 'react';
import './Graph.css';

import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');
/**
 * Компонент построения графиков в режими реального времени
 */
export default class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    canvas: object;
    x_position: number;
    y_position: number;
    _canvasData: object;


    componentDidMount() {
        //Для болнее красивой отрисовки можно поиграться с настройками запросов на сервер и времени рисования Canvas

        setInterval(() => {
            //Движение графиков может отличаться в зависимости от сгенерированныхслучайночисел
            this.createCanvas(this.props.id, 1000);
        }, 500);
    }

    /**
     * Нахождение максимального числа в массиве
     * @param arrayData
     * @returns {any}
     */
    maxDataNumber(arrayData: number): number {
        arrayData = arrayData ? arrayData : 0;

        let min = arrayData[0];
        let max = min;
        for (let i = 1; i < arrayData.length; ++i) {
            if (arrayData[i] > max) max = arrayData[i];
            if (arrayData[i] < min) min = arrayData[i];
        }
        //Т.к при возвращении цифры 0 текст не отрисовывается то возвращаем текст 0 чтобы не происходиле не планируемая перерисовка компонента
        if (!max) {
            max = "0";
        }
        return max;

    }

    getRandomInt(max, delay) {
        let negativeValue = 1;

        let resultNumber = Math.floor(Math.random() * Math.floor(max * negativeValue));
        if (delay && resultNumber % delay === 0) {
            resultNumber = null;
        }
        if (resultNumber % 7) {
            resultNumber *= -1;
        }
        return resultNumber;
    }

    /**
     * Метод создания Canvas
     * @param idCanvas
     * @param speedDrawn скорость отрисовки
     */
    createCanvas(idCanvas: number, speedDrawn: number, data: object): void {
        this.canvas = document.getElementById('canvas_' + idCanvas);
        // контекст, через который будем управлять содержимым canvas
        const contextCanvas = this.canvas.getContext('2d');
        this.setCanvas(contextCanvas, idCanvas, speedDrawn, data);
    }

    /**
     * Метод настройки создоваемого Canvas
     * @param contextCanvas
     * @param idCanvas
     * @param speedDrawn скорость отрисовки
     */
    setCanvas(contextCanvas: CanvasRenderingContext2D, idCanvas: number, speedDrawn: number, data: object): void {
        // объект содержащий настройки
        this['Canvas_' + idCanvas] = {};
        this['Canvas_' + idCanvas].options = {};

        const canvasOptions = this['Canvas_' + idCanvas].options;
        // центр по горизонтали и вертикали
        this.x_position = this.canvas.width / 2;
        this.y_position = this.canvas.height / 2;
        this._canvasData = data;
        let count = 0;
        // длительность отрисовки одного сектора
        canvasOptions.duration = speedDrawn,
            // массив со значениями цвета начала и конца градиента секторов
            canvasOptions.colors = ['#1343F3', '#2196f3', '#1CC39C', '#FF5F62'];
        // шаг отрисовки цветов (размер сектора) в радианах

        // получаем угол начала прогресс бара в радианах
        canvasOptions.start = Math.PI / 180;
        // ширина прогресс бара в px
        canvasOptions.width = 20,
            // радиус прогресс бара в px
            canvasOptions.r = this.x_position - canvasOptions.width;

        // очищаем canvas
        contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // рисуем подложку без анимации


        let valueGraph = this.props.value.stubGraphsData;
        if (typeof valueGraph === "object") {
            valueGraph = this.maxDataNumber(valueGraph);
        }

        canvasOptions.start = 0;
        canvasOptions.step = this.getRadians(valueGraph);
        contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // рисуем подложку без анимации
        if (!this.props.value.startValue) {

            this.drawSector('#214387', canvasOptions.width, null, contextCanvas, canvasOptions);


        }
        else {
            //Вычисляем значение датчиков в процентах
            this._percentageValue = this.props.value.startValue/(this.props.value.maxValue/100);

            valueGraph = this.props.value.startValue;
            canvasOptions.step = this.getRadians(this._percentageValue);
            if (this._percentageValue > 75) {
                canvasOptions.colors =  ['#2196f3', '#2196f3', '#1343F3', '#1343F3'];
            }
            else if (this._percentageValue > 60) {
                canvasOptions.colors =  ['#FF5F62', '#FF5F62', '#2196f3', '#2196f3'];
            }
            else if (this._percentageValue > 35) {
                canvasOptions.colors =  ['#FF5F62', '#FF5F62', '#FF5F62', '#2196f3'];
            }
            else if (this._percentageValue <= 35) {
                canvasOptions.colors =  ['#FF5F62', '#FF5F62', '#FF5F62', '#FF5F62'];
            }
            this.drawSector('#214387', canvasOptions.width, null, contextCanvas, canvasOptions);
        }

        this.draw(count, contextCanvas, canvasOptions)

    }

    /**
     * Метод перевода градусов в радианы
     * @param deg градусы
     */
    getRadians(deg: number): number {
        // переводим градусы в радианы
        return Math.PI / 180 * deg;
    }

    /**
     * Метод отрисовки Canvas
     * @param count
     * @param contextCanvas
     * @param canvasOptions
     */
    draw(count: number, contextCanvas: CanvasRenderingContext2D, canvasOptions: object): void {
        // получаем из массива пару цветов, которая будет использоваться
        // для создания градиента sectorNumber-го сектора прогресс бара
        let startColor = canvasOptions.colors[count],
            endColor = canvasOptions.colors[count + 1];
        const startPosition = canvasOptions.start;
        const radius = canvasOptions.r;
        // получаем координаты X, Y точек начала и конца sectorNumber-го сектора прогресс бара
        let x0 = this.x_position + Math.cos(startPosition) * radius,
            y0 = this.y_position + Math.sin(startPosition) * radius,
            x1 = this.x_position + Math.cos(startPosition + canvasOptions.step) * radius,
            y1 = this.y_position + Math.sin(startPosition + canvasOptions.step) * radius;

        // используя метод createLinearGradient, создаём объект линейного градиента,
        // в качестве аргументов метод принимает значения координат начала и конца
        // сектора, к которому он будет применён
        let gradient = contextCanvas.createLinearGradient(x0, y0, x1, y1);
        // используя метод addColorStop определяем цвет
        // в начале объекта градиента
        gradient.addColorStop(0, startColor);
        // в конце объекта градиента
        gradient.addColorStop(1.0, endColor);

        // старт анимации отрисовки одного сектора
        let start = new Date().getTime();

        let fn = () => {
            // время прошедшее от начала отрисовки сектора
            let now = new Date().getTime() - start;
            // если текущее время превысило время анимации, присваиваем ему значение
            // времени анимации, в противном случае, сектор может получиться
            // большего размера, чем планировалось
            now = (now < canvasOptions.duration) ? now : canvasOptions.duration;
            // на сколько должен быть отрисован текущий сектор
            let renderingDegree = canvasOptions.step * now / canvasOptions.duration;

            // предварительно закрашиваем текущий сектор белым цветом на угол равный renderingDegree
            // толщину берём на 2px больше, чтобы закрасить возможные артефакты

            this.drawSector('#31364c', canvasOptions.width + 8, renderingDegree, contextCanvas, canvasOptions);

            // закрашиваем текущий сектор градиентом на угол равный renderingDegree
            this.drawSector(gradient, canvasOptions.width, renderingDegree, contextCanvas, canvasOptions);

            this.showPercents(count, renderingDegree, contextCanvas, canvasOptions);

// закрашиваем стыки секторов
            this.drawLine(count, contextCanvas, canvasOptions);
            // если текущее время меньше времени анимации, продолжаем
            // рисование текущего сектора
            if (now < canvasOptions.duration) {
                requestAnimationFrame(fn);
            } else {
                // увеличиваем индекс на единицу, чтобы выбрать из массива цветов следующую пару
                count++;
                // все сектора отрисованы, заканчиваем работу функции
                if (count >= canvasOptions.colors.length - 1) {
                    // делаем кнопку запуска прогресс бара неактивно
                    // this.buttonStart.classList.add('disable');
                    // // удаляем зарегистрированный обработчик события
                    // this.buttonStart.removeEventListener('click', () => {
                    //     this.draw()
                    // });
                    // выходим из функции рисования прогресс бара
                    return;
                }
                ;
                if (this.props.value.startValue) {
                    canvasOptions.start += this.getRadians(this._percentageValue);
                } else {
                    // угол, с которого начинает отрисовываться следующий сектор
                    canvasOptions.start += canvasOptions.step;
                }
                // запускаем рисование следующего сектора, рекурсивно
                // вызывая функцию draw
                return this.draw(count, contextCanvas, canvasOptions);
            }
        };

        // старт анимации отрисовки одного сектора
        requestAnimationFrame(fn);
    }

    /**
     * Метод отрисовка сектора на Canvas
     * @param colorFill
     * @param widthWheel
     * @param renderingDegree на сколько должен быть отрисован текущий сектор
     * @param contextCanvas
     * @param canvasOptions
     */
    drawSector(colorFill: string, widthWheel: number, renderingDegree: number | null, contextCanvas: CanvasRenderingContext2D, canvasOptions: object): null {
        // beginPath используется чтобы начать серию действий, описывающих отрисовку фигуры.
        // каждый новый вызов этого метода сбрасывает все действия предыдущего и начинает
        // рисовать заново
        contextCanvas.beginPath();
        // устанавливаем цвет или стиль, используемый при выполнении обводки
        contextCanvas.strokeStyle = colorFill;
        // устанавливается ширина линии, которой будет рисоваться дуга
        contextCanvas.lineWidth = widthWheel;
        // вычисляем конечный угол, если renderingDegree не задан, значит рисуется подложка
        // и задаётся конечный угол прогресс бара
        let end = (renderingDegree === null) ? this.getRadians(427.5) : canvasOptions.start + renderingDegree;
        if (this.props.value.startValue) {
            end = (renderingDegree === null) ? this.getRadians(427.5) : canvasOptions.start + renderingDegree;
        }

        // создаётся дуга, где x_position и y_position центр окружности, далее радиус, начальный и конечный угол

        //Тут идёт проверка если точка начала больше точки конца значит унас идут данные на уменьшения
        if (canvasOptions.start > end) {
            contextCanvas.arc(this.x_position, this.y_position, canvasOptions.r, end, canvasOptions.start);
        }
        else {
            contextCanvas.arc(this.x_position, this.y_position, canvasOptions.r, canvasOptions.start, end);
        }
        // рисуется дуга (часть сектора), с параметрами заданными с помощью
        // strokeStyle, lineWidth и arc
        contextCanvas.stroke();
        return;
    }

    /**
     * Метод отрисовка процентов в центре Диаграммы
     * @param sectorNumber номер рисуемого сектора
     * @param renderingDegree
     * @param contextCanvas на сколько должен быть отрисован текущий сектор
     * @param canvasOptions
     */
    showPercents(sectorNumber: number, renderingDegree: number, contextCanvas: CanvasRenderingContext2D, canvasOptions: object): void {
        // угол в радианах, на который отрисован прогресс бар
        // на текущий момент
        let angle = canvasOptions.step * sectorNumber + renderingDegree,
            // получаем проценты, где 0.0549779 результат деления
            // options.step * 7 на 100
            percents = Math.ceil(angle / 0.0549779);

        // цвет текста
        contextCanvas.fillStyle = '#666';
        // параметры шрифта и текста
        contextCanvas.font = '100 14px Verdana';
        // центрирование текста по горизонтали
        contextCanvas.textAlign = 'center';
        // центрирование текста по вертикали
        contextCanvas.textBaseline = 'center';

        // очищаем область canvas в которую будет выведен текст
        // область представлена в виде прямоугольника заданного
        // начальной точкой (120px,125px), шириной и высотой (60px,30px)
        // отсчёт координат идёт от верхнего левого угла canvas
        contextCanvas.clearRect(43, 50, 65, 50);
        // выводим текст в центр canvas
        let valueGraph = this.props.value.stubGraphsData;
        if (typeof valueGraph === "object") {
            valueGraph = 'MAX ' + this.maxDataNumber(valueGraph);
        }
        if (this.props.value.startValue) {
            valueGraph = this.props.value.startValue;
        }

        contextCanvas.fillText(valueGraph, this.x_position * 1, this.y_position * 0.9);
        contextCanvas.fillText(this.props.value.stubGraphsName, this.x_position, this.y_position * 1.1);
    }

    /**
     * отрисовка линии между секторами для того чтобы скрыть разрыв и диаграмма казалась бесшовной
     * @param sectorNumber номер рисуемого сектора
     * @param renderingDegree
     * @param contextCanvas на сколько должен быть отрисован текущий сектор
     * @param canvasOptions
     */
    drawLine(sectorNumber: number, contextCanvas: CanvasRenderingContext2D, canvasOptions: object): null {
        const start = canvasOptions.start;
        const radius = canvasOptions.r;
        // определяем координаты начала и конца линии границы текущего сектора
        let x0 = this.x_position + Math.cos(start) * (radius + 10),
            y0 = this.y_position + Math.sin(start) * (radius + 10),
            x1 = this.x_position + Math.cos(start) * (radius - 10),
            y1 = this.y_position + Math.sin(start) * (radius - 10);

        contextCanvas.beginPath();
        // Вариант 1 - назначаем цвет границы стыка всех секторов
        //contextCanvas.strokeStyle = '#fff';
        // Вариант 2 - выбираем цвет стыка текущего и следующего секторов из массива
        contextCanvas.strokeStyle = canvasOptions.colors[sectorNumber];
        // устанавливаем координаты начала и конца рисуемой линии и
        // её толщину
        contextCanvas.moveTo(x0, y0);
        contextCanvas.lineTo(x1, y1);
        contextCanvas.lineWidth = 1;
        // рисуем границу секторов
        contextCanvas.stroke();
        return;
    }


    render() {
        return (

            <div key="canvas" className="Graphs">
                <canvas id={'canvas_' + this.props.id} width="150" height="150"></canvas>
            </div>

        );
    }
}



