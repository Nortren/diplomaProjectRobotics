import * as React from 'react';
import './ElementsCarouselVertical.css';

import * as openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8010');

class ElementsCarouselVertical extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0,
        };
    }

    componentDidMount() {
        this.getBlGraphsData(100, {test: 123})
    }

    /**
     * Запрос на бизнес логику для получения данных и построения по ним графиков
     * @param interval частота обращения на БЛ
     * @param data данные для отправки на сервер
     */

    getBlGraphsData(interval: number, data: object) {
        socket.emit('setGraphsData', interval, data);
        socket.on('getGraphsData', (data) => {
            this.graphsUpdate(data);
        });
    }

    /**
     * Отрисовка графиков на Canvas
     * @param idCanvas
     * @param dataGraphs данны с для отрисовки
     * @param color цвет линии графика
     */
    drawsGraphs(idCanvas: number, dataGraphs: number | [], color: number) {
        //цвета линий
        const colors = ['#2196f3', '#1CC39C', '#FF5F62', '#2196f3'];
        const canvas = document.getElementById(idCanvas);
        const gr = canvas.getContext('2d');
        //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
        const bodySize = document.getElementsByClassName('carousel_vertical_line_element')[0];
        canvas.setAttribute('width', bodySize.offsetWidth);
        canvas.setAttribute('height', bodySize.offsetHeight * 0.65);
        const maxCount = 35 + 10;
        const x0 = 30;
        const y0 = 80;
        const width = canvas.width - 200;
        const height = canvas.height - 100;
        const stepY = Math.round(height / bodySize.offsetHeight * 10);
        const stepX = Math.round(width / bodySize.offsetWidth * 10);

        //рисуются кривые

        gr.beginPath();

        for (let counData in dataGraphs) {
            const count = dataGraphs[counData];
            const x = x0 + ((counData - 1) * stepX);
            const y = y0 + (height - count * stepY);

            if (1 == counData) {
                gr.moveTo(x, y);
            } else {
                gr.lineTo(x, y);
            }
        }
        gr.strokeStyle = colors[color]; //цвет линии
        gr.lineWidth = 3;//толщина линии
        gr.stroke();

    }

    /**
     * Нахождение максимального числа в массиве
     * @param arrayData
     * @returns {any}
     */
    maxDataNumber(arrayData: number) {

        let min = arrayData[0];
        let max = min;
        for (let i = 1; i < arrayData.length; ++i) {
            if (arrayData[i] > max) max = arrayData[i];
            if (arrayData[i] < min) min = arrayData[i];
        }
        return max;
    }

    /**
     * Записываем данные по контролу с графиками в state
     * @param graphsName
     * @param graphValue
     * @param graphMaxValue
     * @param serialNumber if графика чтобы мы могли манипулировать его цветом и порядком
     */
    parseData(graphsName: string, graphValue: number, graphMaxValue: number, serialNumber: number) {
        //Чистим графики
        if (this.state[graphsName] && this.state[graphsName].length > 79) {
            this.state[graphsName] = [];
        }
        //Инициализируем массив если его еще нет в который будет пушить данные с сервера
        if (!this.state[graphsName]) {
            this.state[graphsName] = [];
        }
        if (graphValue) {
            this.state[graphsName].push(graphValue);
        }
        this.setState({
            [graphsName]: this.state[graphsName],
            ['maxValueGraphs_' + serialNumber]: this.maxDataNumber(this.state[graphsName])
        });
        this.drawsGraphs(serialNumber, this.state[graphsName], serialNumber - 1);
    }

    /**
     * записываем данные пришедшие с сервера по переменным
     * @param graphsData
     */
    graphsUpdate(graphsData: object) {
        let serialNumber = 0;
        for (let graph in graphsData.dataGraphs) {
            serialNumber++;
            const graphs = graphsData.dataGraphs[graph];
            const graphValue = graphs.stubGraphsData;
            const graphMaxValue = graphs.maxValueGraphs;
            this.parseData(graph, graphValue, graphMaxValue, serialNumber);

        }
    }

    render() {
        const style = {top: this.state.elementShift};
        //TODO эти данные должен отдавать сервер
        const test = [{
            id: 1,
            name: 'Давление',
            value: this.state.maxValueGraphs_1
        }, {
            id: 2,
            name: 'Температура',
            value: this.state.maxValueGraphs_2
        },
            {
                id: 3,
                name: 'Радиационный фон',
                value: this.state.maxValueGraphs_3
            }, {
                id: 4,
                name: 'Концентрация вредных веществ',
                value: this.state.maxValueGraphs_4
            }];
        const elementContainerWidth = 300;
        const lengthArrayData = test.length * elementContainerWidth;
        return (
            <div>
       
                        {test.map(function (object) {
                            return <div key={object.id} className="list-group-item carousel_vertical_line_element">
                                <div className="carousel_vertical_line_element__dataContainer">
                                    <div
                                        className="carousel_vertical_line_element__dataContainer-name">{object.name}</div>
                                    <div
                                        className="carousel_vertical_line_element__dataContainer-value">{object.value}</div>
                                </div>
                                <canvas id={object.id}></canvas>
                            </div>;
                        })}


            </div>

        );
    }
}

export default ElementsCarouselVertical;

