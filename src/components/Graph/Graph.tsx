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

    componentDidMount() {
        this.canvas = document.getElementById('canvasTest');
        // контекст, через который будем управлять содержимым canvas
        this.ctx = this.canvas.getContext('2d');
        // объект содержащий настройки
        this.options = {};
        // центр по горизонтали и вертикали
        this.xc = this.canvas.width / 2;
        this.yc = this.canvas.height / 2;

        let count = 0;
        // длительность отрисовки одного сектора
        this.options.duration = 300,
            // массив со значениями цвета начала и конца градиента секторов
            this.options.colors = ['#f00', '#ff2f00', '#ff7e00', '#ffde00', '#dffc00', '#7ae000', '#2cbb00', '#15b200'];
        // шаг отрисовки цветов (размер сектора) в радианах
        this.options.step = this.getRadians(55);
        // получаем угол начала прогресс бара в радианах
        this.options.start = Math.PI / 180;
        // ширина прогресс бара в px
        this.options.width = 20,
            // радиус прогресс бара в px
            this.options.r = this.xc - this.options.width;

        // очищаем canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // рисуем подложку без анимации
        this.drawSector('#eee', this.options.width);
        // объект кнопки, запускающей прогресс бар
        this.buttonStart = document.querySelector('.button');

        // запускаем рисование прогресс бара
        this.buttonStart.addEventListener('click', () => {
            this.draw(count);
        });
    }

    getRadians(degree) {
        // переводим градусы в радианы
        return Math.PI / 180 * degree;
    }


    draw(count) {
        // получаем из массива пару цветов, которая будет использоваться
        // для создания градиента i-го сектора прогресс бара
        var startColor = this.options.colors[count],
            endColor = this.options.colors[count + 1];

        // получаем координаты X, Y точек начала и конца i-го сектора прогресс бара
        var x0 = this.xc + Math.cos(this.options.start) * this.options.r,
            y0 = this.yc + Math.sin(this.options.start) * this.options.r,
            x1 = this.xc + Math.cos(this.options.start + this.options.step) * this.options.r,
            y1 = this.yc + Math.sin(this.options.start + this.options.step) * this.options.r;

        // используя метод createLinearGradient, создаём объект линейного градиента,
        // в качестве аргументов метод принимает значения координат начала и конца
        // сектора, к которому он будет применён
        var gradient = this.ctx.createLinearGradient(x0, y0, x1, y1);
        // используя метод addColorStop определяем цвет
        // в начале объекта градиента
        gradient.addColorStop(0, startColor);
        // в конце объекта градиента
        gradient.addColorStop(1.0, endColor);

        // старт анимации отрисовки одного сектора
        var start = new Date().getTime();

        var fn = () => {
            // время прошедшее от начала отрисовки сектора
            var now = new Date().getTime() - start;
            // если текущее время превысило время анимации, присваиваем ему значение
            // времени анимации, в противном случае, сектор может получиться
            // большего размера, чем планировалось
            now = (now < this.options.duration) ? now : this.options.duration;
            // на сколько должен быть отрисован текущий сектор
            var inc = this.options.step * now / this.options.duration;

            // предварительно закрашиваем текущий сектор белым цветом на угол равный inc
            // толщину берём на 2px больше, чтобы закрасить возможные артефакты
            this.drawSector('#fff', this.options.width + 2, inc);
            // закрашиваем текущий сектор градиентом на угол равный inc
            this.drawSector(gradient, this.options.width, inc);
// закрашиваем стыки секторов
            this.drawLine(count);
            // если текущее время меньше времени анимации, продолжаем
            // рисование текущего сектора
            if (now < this.options.duration) {
                requestAnimationFrame(fn);
            } else {
                // увеличиваем индекс на единицу, чтобы выбрать из массива цветов следующую пару
                count++;
                // все сектора отрисованы, заканчиваем работу функции
                if (count >= this.options.colors.length - 1) {
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
                this.options.start += this.options.step;
                // запускаем рисование следующего сектора, рекурсивно
                // вызывая функцию draw
                return this.draw(count);
            }
        };

        // старт анимации отрисовки одного сектора
        requestAnimationFrame(fn);
    }

    drawSector(colorFill, widthWheel, inc) {
        // beginPath используется чтобы начать серию действий, описывающих отрисовку фигуры.
        // каждый новый вызов этого метода сбрасывает все действия предыдущего и начинает
        // рисовать заново
        this.ctx.beginPath();
        // устанавливаем цвет или стиль, используемый при выполнении обводки
        this.ctx.strokeStyle = colorFill;
        // устанавливается ширина линии, которой будет рисоваться дуга
        this.ctx.lineWidth = widthWheel;
        // вычисляем конечный угол, если inc не задан, значит рисуется подложка
        // и задаётся конечный угол прогресс бара
        var end = (inc === undefined) ? this.getRadians(427.5) : this.options.start + inc;
        // создаётся дуга, где xc и yc центр окружности, далее радиус, начальный и конечный угол
        this.ctx.arc(this.xc, this.yc, this.options.r, this.options.start, end);
        // рисуется дуга (часть сектора), с параметрами заданными с помощью
        // strokeStyle, lineWidth и arc
        this.ctx.stroke();
        return;
    }

    showPercents(i, inc) {
        // угол в радианах, на который отрисован прогресс бар
        // на текущий момент
        var angle = this.options.step * i + inc,
            // получаем проценты, где 0.0549779 результат деления
            // options.step * 7 на 100
            percents = Math.ceil(angle / 0.0549779);

        // цвет текста
        this.ctx.fillStyle = '#666';
        // параметры шрифта и текста
        this.ctx.font = '400 20px Roboto';
        // центрирование текста по горизонтали
        this.ctx.textAlign = 'center';
        // центрирование текста по вертикали
        this.ctx.textBaseline = 'center';

        // очищаем область canvas в которую будет выведен текст
        // область представлена в виде прямоугольника заданного
        // начальной точкой (120px,125px), шириной и высотой (60px,30px)
        // отсчёт координат идёт от верхнего левого угла canvas
        this.ctx.clearRect(120, 125, 60, 30);
        // выводим текст в центр canvas
        this.ctx.fillText(percents + '%', this.xc, this.yc);
    }

    drawLine(i) {
        // определяем координаты начала и конца линии границы текущего сектора
        var x0 = this.xc + Math.cos(this.options.start) * (this.options.r + 10),
            y0 = this.yc + Math.sin(this.options.start) * (this.options.r + 10),
            x1 = this.xc + Math.cos(this.options.start) * (this.options.r - 10),
            y1 = this.yc + Math.sin(this.options.start) * (this.options.r - 10);

        this.ctx.beginPath();
        // Вариант 1 - назначаем цвет границы стыка всех секторов
        //ctx.strokeStyle = '#fff';
        // Вариант 2 - выбираем цвет стыка текущего и следующего секторов из массива
        this.ctx.strokeStyle = this.options.colors[i];
        // устанавливаем координаты начала и конца рисуемой линии и
        // её толщину
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineWidth = 1;
        // рисуем границу секторов
        this.ctx.stroke();
        return;
    }


    render() {
        return (
            <div>
                <div key="canvas" className="wrap">
                    <canvas id="canvasTest" width="150" height="150"></canvas>
                    <button type="button" className="button">start</button>
                </div>
            </div>
        );
    }
}



