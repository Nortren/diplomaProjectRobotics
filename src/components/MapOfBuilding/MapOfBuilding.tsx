import * as React from 'react';
import {YMaps, Map, Placemark, Polyline} from "react-yandex-maps";

export default class MapOfBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinate: []
        };
    }

    componentDidMount(prevProps) {

        // setInterval(() => {
        //     //Движение графиков может отличаться в зависимости от сгенерированныхслучайночисел
        //     this.createCanvas(1, 800);
        // }, 400);
        this.createCanvas();
    }

    /**
     * Метод создания Canvas
     * @param idCanvas
     * @param speedDrawn скорость отрисовки
     */
    createCanvas(idCanvas: number, speedDrawn: number, data: object): void {
        var img = new Image();
        img.src = "src/images/plan.png";
        this.canvas = document.getElementById('canvas_1777');
        // контекст, через который будем управлять содержимым canvas
        const width = document.getElementsByClassName('dataVisualisation')[1].offsetWidth;
        const height = document.getElementsByClassName('dataVisualisation')[1].offsetHeight;
        this.setState({width: width,height:height});
        const contextCanvas = this.canvas.getContext('2d');
        img.onload = function () {
            //	оператор try..catch используем для обработки ошибок, например если холст не найден
            //	в некоторых случах было замечено ошибочный вызов исключений при получении холста
            try {
                //	получаем контент холста

                // Рисуем изображение от точки с координатами 10, 40
                contextCanvas.drawImage(img, 0, 0, width, height);
                contextCanvas.beginPath();
                contextCanvas.moveTo(30,96);
                contextCanvas.lineTo(70,66);
                contextCanvas.lineTo(103,76);
                contextCanvas.lineTo(170,15);
                contextCanvas.stroke();
            }
            catch (err) {
                //	выводит необходимую ошибку
                console.log('Ошибка');
            }
        }


    }

    render() {

        return (
            <div className="dataVisualisation card-body col-lg-6 col-md-12 col-12">
                <canvas id='canvas_1777' width={this.state.width} height={this.state.height}></canvas>
            </div>
        )
    }
}
