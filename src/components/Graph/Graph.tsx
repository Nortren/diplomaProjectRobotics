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
      this.createCanvas(1);
      this.createCanvas(2);
      this.createCanvas(3);
      this.createCanvas(4);
    }

    createCanvas(idCanvas) {
        this.canvas = document.getElementById('canvasTest'+idCanvas);
        // контекст, через который будем управлять содержимым canvas
        const ctx = this.canvas.getContext('2d');
        this.setCanvass(ctx,idCanvas);
    }
    setCanvass(ctx,idCanvas) {
        // объект содержащий настройки
        this['Canvas_'+idCanvas]= {};
        this['Canvas_'+idCanvas].options = {};
      
        // центр по горизонтали и вертикали
        this.xc = this.canvas.width / 2;
        this.yc = this.canvas.height / 2;

        let count = 0;
        // длительность отрисовки одного сектора
        this['Canvas_'+idCanvas].options.duration = 300,
            // массив со значениями цвета начала и конца градиента секторов
            this['Canvas_'+idCanvas].options.colors = ['#f00', '#ff2f00', '#ff7e00', '#ffde00', '#dffc00', '#7ae000', '#2cbb00', '#15b200'];
        // шаг отрисовки цветов (размер сектора) в радианах
        this['Canvas_'+idCanvas].options.step = this.getRadians(51.7);
        // получаем угол начала прогресс бара в радианах
        this['Canvas_'+idCanvas].options.start = Math.PI / 180;
        // ширина прогресс бара в px
        this['Canvas_'+idCanvas].options.width = 20,
            // радиус прогресс бара в px
            this['Canvas_'+idCanvas].options.r = this.xc - this['Canvas_'+idCanvas].options.width;

        // очищаем canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // рисуем подложку без анимации
        this.drawSector('#eee', this['Canvas_'+idCanvas].options.width,null,ctx,idCanvas);
        // объект кнопки, запускающей прогресс бар
        this.buttonStart = document.getElementById('buttonStart');
        this.buttonRemove = document.getElementById('buttonRemove');
        // запускаем рисование прогресс бара
        this.buttonStart.addEventListener('click', () => {
            this.draw(count,ctx,idCanvas);
        });

        this.buttonRemove.addEventListener('click', () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }
    getRadians(degree) {
        // переводим градусы в радианы
        return Math.PI / 180 * degree;
    }


    draw(count,ctx,idCanvas) {
        // получаем из массива пару цветов, которая будет использоваться
        // для создания градиента i-го сектора прогресс бара
        var startColor = this['Canvas_'+idCanvas].options.colors[count],
            endColor = this['Canvas_'+idCanvas].options.colors[count + 1];

        // получаем координаты X, Y точек начала и конца i-го сектора прогресс бара
        var x0 = this.xc + Math.cos(this['Canvas_'+idCanvas].options.start) * this['Canvas_'+idCanvas].options.r,
            y0 = this.yc + Math.sin(this['Canvas_'+idCanvas].options.start) * this['Canvas_'+idCanvas].options.r,
            x1 = this.xc + Math.cos(this['Canvas_'+idCanvas].options.start + this['Canvas_'+idCanvas].options.step) * this['Canvas_'+idCanvas].options.r,
            y1 = this.yc + Math.sin(this['Canvas_'+idCanvas].options.start + this['Canvas_'+idCanvas].options.step) * this['Canvas_'+idCanvas].options.r;

        // используя метод createLinearGradient, создаём объект линейного градиента,
        // в качестве аргументов метод принимает значения координат начала и конца
        // сектора, к которому он будет применён
        var gradient = ctx.createLinearGradient(x0, y0, x1, y1);
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
            now = (now < this['Canvas_'+idCanvas].options.duration) ? now : this['Canvas_'+idCanvas].options.duration;
            // на сколько должен быть отрисован текущий сектор
            var inc = this['Canvas_'+idCanvas].options.step * now / this['Canvas_'+idCanvas].options.duration;

            // предварительно закрашиваем текущий сектор белым цветом на угол равный inc
            // толщину берём на 2px больше, чтобы закрасить возможные артефакты
            this.drawSector('#fff', this['Canvas_'+idCanvas].options.width + 2, inc,ctx,idCanvas);
            // закрашиваем текущий сектор градиентом на угол равный inc
            this.drawSector(gradient, this['Canvas_'+idCanvas].options.width, inc,ctx,idCanvas);

            this.showPercents(count, inc,ctx,idCanvas);

// закрашиваем стыки секторов
            this.drawLine(count,ctx,idCanvas);
            // если текущее время меньше времени анимации, продолжаем
            // рисование текущего сектора
            if (now < this['Canvas_'+idCanvas].options.duration) {
                requestAnimationFrame(fn);
            } else {
                // увеличиваем индекс на единицу, чтобы выбрать из массива цветов следующую пару
                count++;
                // все сектора отрисованы, заканчиваем работу функции
                if (count >= this['Canvas_'+idCanvas].options.colors.length - 1) {
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
                this['Canvas_'+idCanvas].options.start += this['Canvas_'+idCanvas].options.step;
                // запускаем рисование следующего сектора, рекурсивно
                // вызывая функцию draw
                return this.draw(count,ctx,idCanvas);
            }
        };

        // старт анимации отрисовки одного сектора
        requestAnimationFrame(fn);
    }

    drawSector(colorFill, widthWheel, inc,ctx,idCanvas) {
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
        var end = (inc === null) ? this.getRadians(427.5) : this['Canvas_'+idCanvas].options.start + inc;
        // создаётся дуга, где xc и yc центр окружности, далее радиус, начальный и конечный угол
        ctx.arc(this.xc, this.yc, this['Canvas_'+idCanvas].options.r, this['Canvas_'+idCanvas].options.start, end);
        // рисуется дуга (часть сектора), с параметрами заданными с помощью
        // strokeStyle, lineWidth и arc
        ctx.stroke();
        return;
    }

    showPercents(i, inc, ctx,idCanvas) {
        // угол в радианах, на который отрисован прогресс бар
        // на текущий момент
        var angle = this['Canvas_'+idCanvas].options.step * i + inc,
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

    drawLine(i,ctx,idCanvas) {
        // определяем координаты начала и конца линии границы текущего сектора
        var x0 = this.xc + Math.cos(this['Canvas_'+idCanvas].options.start) * (this['Canvas_'+idCanvas].options.r + 10),
            y0 = this.yc + Math.sin(this['Canvas_'+idCanvas].options.start) * (this['Canvas_'+idCanvas].options.r + 10),
            x1 = this.xc + Math.cos(this['Canvas_'+idCanvas].options.start) * (this['Canvas_'+idCanvas].options.r - 10),
            y1 = this.yc + Math.sin(this['Canvas_'+idCanvas].options.start) * (this['Canvas_'+idCanvas].options.r - 10);

        ctx.beginPath();
        // Вариант 1 - назначаем цвет границы стыка всех секторов
        //ctx.strokeStyle = '#fff';
        // Вариант 2 - выбираем цвет стыка текущего и следующего секторов из массива
        ctx.strokeStyle = this['Canvas_'+idCanvas].options.colors[i];
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



