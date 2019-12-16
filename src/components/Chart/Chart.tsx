import * as React from 'react';
import './Chart.css';

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
        this.getBlChartData(100, {test: 123});
    }

    /**
     * Запрос на бизнес логику для получения данных и построения по ним графиков
     * @param interval частота обращения на БЛ
     * @param data данные для отправки на сервер
     */

    getBlChartData(interval: number, data: object): void {
        socket.emit('setChartData', interval, data);
        socket.on('getChartData', (data) => {
            this.graphsUpdate(data);
        });
    }

    /**
     * Отрисовка графиков на Canvas
     * @param idCanvas
     * @param dataGraphs данны с для отрисовки
     * @param color цвет линии графика
     */
    drawsGraphs(idCanvas: number, dataGraphs: number | [], color: number): void {
        //цвета линий
        const colors = ['#2196f3', '#1CC39C', '#FF5F62', '#2196f3'];
        const canvas = document.getElementById(idCanvas);
        const gr = canvas.getContext('2d');
        //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
        const bodySizeWidth = document.getElementsByClassName('carousel_vertical_line_element__dataContainer')[0];
        const bodySizeHeight = document.getElementsByClassName('list-group-item carousel_vertical_line_element')[0];
        canvas.setAttribute('width', bodySizeWidth.offsetWidth);
        canvas.setAttribute('height', bodySizeHeight.offsetHeight * 0.6);
        const maxCount = 35 + 10;
        const x0 = 30;
        const y0 = 60;
        const width = canvas.width - 200;
        const height = canvas.height - 100;
        const stepY = Math.round(height / bodySizeHeight.offsetHeight * 10);
        const stepX = Math.round(width / bodySizeWidth.offsetWidth * 10);

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
    maxDataNumber(arrayData: number): number {


        let min = arrayData[0];
        let max = min;
        for (let i = 1; i < arrayData.length; ++i) {
            if (arrayData[i] > max) max = arrayData[i];
            if (arrayData[i] < min) min = arrayData[i];
        }
        //Т.к при возвращении цифры 0 текст не отрисовывается то возвращаем текст 0 чтобы не происходиле не планируемая перерисовка компонента
        if(!max){
            max = "0";
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
    parseData(graphsName: string, graphValue: number, graphMaxValue: number, serialNumber: number): void {
        //Чистим графики
        if (this.state[graphsName] && this.state[graphsName].length > 120) {
            this.state[graphsName] = [];
        }
        //Инициализируем массив если его еще нет в который будет пушить данные с сервера
        if (!this.state[graphsName]) {
            this.state[graphsName] = [];
        }
        if (typeof graphValue === 'number') {
            this.state[graphsName].push(graphValue);
        }
        if ((typeof graphValue === 'object') && graphValue !== null) {
            this.state[graphsName] = (graphValue);
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
    graphsUpdate(graphsData: object): void {
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
        return (
            <div>
                <div key={this.props.id} className="list-group-item carousel_vertical_line_element">
                    <div className="carousel_vertical_line_element__dataContainer">
                        <div
                            className="carousel_vertical_line_element__dataContainer-name">{this.props.name}</div>
                        <div
                            className="carousel_vertical_line_element__dataContainer-value">{this.state['maxValueGraphs_' + this.props.id]}</div>
                    </div>
                    <canvas id={this.props.id}></canvas>
                </div>

            </div>
        );
    }
}



