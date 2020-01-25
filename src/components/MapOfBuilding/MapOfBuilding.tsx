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

        setInterval(() => {
            if(this.props.source) {
                this.createCanvas(this.props.source);
            }
        }, 10);
    }

    /**
     * Метод создания Canvas
     * @param idCanvas
     * @param speedDrawn скорость отрисовки
     */
    createCanvas( data: object): void {
        var img = new Image();
        img.src = data.img_src;
        this.canvas = document.getElementById('canvas_1777');
        // контекст, через который будем управлять содержимым canvas
        const width = document.getElementsByClassName('dataVisualisation')[1].offsetWidth * 0.93;
        const height = document.getElementsByClassName('dataVisualisation')[1].offsetHeight * 0.77;
        this.setState({width: width, height: height});
        const contextCanvas = this.canvas.getContext('2d');

        img.onload = ()=> {
            //	оператор try..catch используем для обработки ошибок, например если холст не найден
            //	в некоторых случах было замечено ошибочный вызов исключений при получении холста
            try {
                //	получаем контент холста

                // Рисуем изображение от точки с координатами 10, 40
                contextCanvas.drawImage(img, 0, 0, width, height);


                contextCanvas.beginPath();
                contextCanvas.arc(data.moveX, data.moveY, 2, 0, 2 * Math.PI, false);
                contextCanvas.fillStyle = 'red';
                contextCanvas.fill();
                contextCanvas.lineWidth = 1;
                contextCanvas.strokeStyle = 'red';
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
