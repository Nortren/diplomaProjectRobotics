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

    /**
     * Запрос на бизнес логику для получения данных и построения по ним графиков
     * @param interval частота обращения на БЛ
     * @param data данные для отправки на сервер
     */

    getBlGraphsData(interval: number, data: object): void {
        socket.emit('setGraphsData', interval, data);
        socket.on('getGraphsData', (data) => {
            this.graphsUpdate(data);
        });
    }


    componentDidMount() {
      this.createCanvas(1,300,this.getRandomInt(-500));
      this.createCanvas(2,500,this.getRandomInt(100));
      this.createCanvas(3,2000,this.getRandomInt(40));
      this.createCanvas(4,1000,this.getRandomInt(50));
    }
    getRandomInt(max, delay) {
        let resultNumber = Math.floor(Math.random() * Math.floor(max));
        if (delay && resultNumber % delay === 0) {
            resultNumber = null;
        }
        return resultNumber;
    }
    createCanvas(idCanvas,speedDrawn,data) {
        this.canvas = document.getElementById('canvasTest'+idCanvas);
        // контекст, через который будем управлять содержимым canvas
        const ctx = this.canvas.getContext('2d');
        this.setCanvass(ctx,idCanvas,speedDrawn,data);
    }
    setCanvass(ctx,idCanvas,speedDrawn,data) {
        // объект содержащий настройки
        this['Canvas_'+idCanvas]= {};
        this['Canvas_'+idCanvas].options = {};

        const canvasOptions =  this['Canvas_'+idCanvas].options;
        // центр по горизонтали и вертикали
        this.xc = this.canvas.width / 2;
        this.yc = this.canvas.height / 2;

        let count = 0;
        // длительность отрисовки одного сектора
        canvasOptions.duration = speedDrawn,
            // массив со значениями цвета начала и конца градиента секторов
        canvasOptions.colors = ['#f00', '#ff2f00', '#ff7e00', '#ffde00', '#dffc00', '#7ae000', '#2cbb00', '#15b200'];
        // шаг отрисовки цветов (размер сектора) в радианах
        canvasOptions.step = this.getRadians(data);
        // получаем угол начала прогресс бара в радианах
        canvasOptions.start = Math.PI / 180;
        // ширина прогресс бара в px
        canvasOptions.width = 20,
            // радиус прогресс бара в px
            canvasOptions.r = this.xc - canvasOptions.width;

        // очищаем canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // рисуем подложку без анимации
        this.drawSector('#2196f3', canvasOptions.width,null,ctx,canvasOptions);
        // объект кнопки, запускающей прогресс бар
        this.buttonStart = document.getElementById('buttonStart');
        this.buttonRemove = document.getElementById('buttonRemove');
        // запускаем рисование прогресс бара
        this.buttonStart.addEventListener('click', () => {
            this.draw(count,ctx,canvasOptions);
        });

        this.buttonRemove.addEventListener('click', () => {
            canvasOptions.start = 0;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawSector('#2196f3', canvasOptions.width,null,ctx,canvasOptions);
        });
    }
    getRadians(degree) {
        // переводим градусы в радианы
        return Math.PI / 180 * degree;
    }


    draw(count,ctx,canvasOptions) {
        // получаем из массива пару цветов, которая будет использоваться
        // для создания градиента i-го сектора прогресс бара
        let startColor = canvasOptions.colors[count],
            endColor = canvasOptions.colors[count + 1];
        const startPosition = canvasOptions.start;
        const radius = canvasOptions.r;
        // получаем координаты X, Y точек начала и конца i-го сектора прогресс бара
        let x0 = this.xc + Math.cos(startPosition) * radius,
            y0 = this.yc + Math.sin(startPosition) * radius,
            x1 = this.xc + Math.cos(startPosition + canvasOptions.step) * radius,
            y1 = this.yc + Math.sin(startPosition + canvasOptions.step) * radius;

        // используя метод createLinearGradient, создаём объект линейного градиента,
        // в качестве аргументов метод принимает значения координат начала и конца
        // сектора, к которому он будет применён
        let gradient = ctx.createLinearGradient(x0, y0, x1, y1);
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
            let inc = canvasOptions.step * now / canvasOptions.duration;

            // предварительно закрашиваем текущий сектор белым цветом на угол равный inc
            // толщину берём на 2px больше, чтобы закрасить возможные артефакты
            this.drawSector('#31364c', canvasOptions.width + 8, inc,ctx,canvasOptions);
            // закрашиваем текущий сектор градиентом на угол равный inc
            this.drawSector(gradient, canvasOptions.width, inc,ctx,canvasOptions);

            this.showPercents(count, inc,ctx,canvasOptions);

// закрашиваем стыки секторов
            this.drawLine(count,ctx,canvasOptions);
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
                    this.buttonStart.classList.add('disable');
                    // удаляем зарегистрированный обработчик события
                    this.buttonStart.removeEventListener('click', () => {
                        this.draw()
                    });
                    // выходим из функции рисования прогресс бара
                    return;
                }
                // угол, с которого начинает отрисовываться следующий сектор
                canvasOptions.start += canvasOptions.step;
                // запускаем рисование следующего сектора, рекурсивно
                // вызывая функцию draw
                return this.draw(count,ctx,canvasOptions);
            }
        };

        // старт анимации отрисовки одного сектора
        requestAnimationFrame(fn);
    }

    drawSector(colorFill, widthWheel, inc,ctx,canvasOptions) {
        // beginPath используется чтобы начать серию действий, описывающих отрисовку фигуры.
        // каждый новый вызов этого метода сбрасывает все действия предыдущего и начинает
        // рисовать заново
        ctx.beginPath();
        // устанавливаем цвет или стиль, используемый при выполнении обводки
        ctx.strokeStyle = colorFill;
        // устанавливается ширина линии, которой будет рисоваться дуга
        ctx.lineWidth = widthWheel;
        // вычисляем конечный угол, если inc не задан, значит рисуется подложка
        // и задаётся конечный угол прогресс бара
        let end = (inc === null) ? this.getRadians(427.5) : canvasOptions.start + inc;
        // создаётся дуга, где xc и yc центр окружности, далее радиус, начальный и конечный угол

        //Тутидёт проверка если точка начала больше точки конца значит унас идут данные на уменьшения
        if(canvasOptions.start > end){
            ctx.arc(this.xc, this.yc, canvasOptions.r,  end,canvasOptions.start);
        }
        else {
            ctx.arc(this.xc, this.yc, canvasOptions.r,canvasOptions.start,  end);
        }
        // рисуется дуга (часть сектора), с параметрами заданными с помощью
        // strokeStyle, lineWidth и arc
        ctx.stroke();
        return;
    }

    showPercents(i, inc, ctx,canvasOptions) {
        // угол в радианах, на который отрисован прогресс бар
        // на текущий момент
        let angle = canvasOptions.step * i + inc,
            // получаем проценты, где 0.0549779 результат деления
            // options.step * 7 на 100
            percents = Math.ceil(angle / 0.0549779);

        // цвет текста
        ctx.fillStyle = '#666';
        // параметры шрифта и текста
        ctx.font = '400 20px Roboto';
        // центрирование текста по горизонтали
        ctx.textAlign = 'center';
        // центрирование текста по вертикали
        ctx.textBaseline = 'center';

        // очищаем область canvas в которую будет выведен текст
        // область представлена в виде прямоугольника заданного
        // начальной точкой (120px,125px), шириной и высотой (60px,30px)
        // отсчёт координат идёт от верхнего левого угла canvas
        ctx.clearRect(50, 50, 60, 30);
        // выводим текст в центр canvas
        ctx.fillText(percents + '%', this.xc, this.yc);
    }

    drawLine(i,ctx,canvasOptions) {
        const start = canvasOptions.start;
        const radius = canvasOptions.r;
        // определяем координаты начала и конца линии границы текущего сектора
        let x0 = this.xc + Math.cos(start) * (radius + 10),
            y0 = this.yc + Math.sin(start) * (radius + 10),
            x1 = this.xc + Math.cos(start) * (radius - 10),
            y1 = this.yc + Math.sin(start) * (radius - 10);

        ctx.beginPath();
        // Вариант 1 - назначаем цвет границы стыка всех секторов
        //ctx.strokeStyle = '#fff';
        // Вариант 2 - выбираем цвет стыка текущего и следующего секторов из массива
        ctx.strokeStyle = canvasOptions.colors[i];
        // устанавливаем координаты начала и конца рисуемой линии и
        // её толщину
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineWidth = 1;
        // рисуем границу секторов
        ctx.stroke();
        return;
    }


    render() {
        return (
            <div className="GraphsAll">
                <div key="canvas"  className="Graphs">
                    <canvas id="canvasTest1" width="150" height="150"></canvas>
                    <canvas id="canvasTest2" width="150" height="150"></canvas>
                    <canvas id="canvasTest3" width="150" height="150"></canvas>
                    <canvas id="canvasTest4" width="150" height="150"></canvas>

                </div>
                <button id="buttonStart" type="button" className="button">start</button>
                <button id="buttonRemove" type="button" className="button ">remove</button>
            </div>
        );
    }
}



