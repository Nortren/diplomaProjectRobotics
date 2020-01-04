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
            //Движение графиков может отличаться в зависимости от сгенерированныхслучайночисел
            this.createCanvas(this.props.source);
        }, 400);
        // this.createCanvas();
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

                this.drawMove(contextCanvas,img, width, height);
            }
            catch (err) {
                //	выводит необходимую ошибку
                console.log('Ошибка');
            }
        }


    }
    drawMove(contextCanvas,img, widthA, heightB) {
        let moveX = 50;
        let moveY = 160;
        let moveCheck = 0;
        let rand = 1;
        setInterval(()=>{
            contextCanvas.drawImage(img, 0, 0, widthA, heightB);

            moveCheck++;
            if(rand === 1) {
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
            if(rand === 2) {
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
            if(rand === 3) {
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
                    rand = 1;
                }
            }

            contextCanvas.beginPath();
            contextCanvas.arc(moveX, moveY, 2, 0, 2 * Math.PI, false);
            contextCanvas.fillStyle = 'red';
            contextCanvas.fill();
            contextCanvas.lineWidth = 1;
            contextCanvas.strokeStyle = 'red';
            contextCanvas.stroke();
        },50)

    }

    render() {

        return (
            <div className="dataVisualisation card-body col-lg-6 col-md-12 col-12">
                <canvas id='canvas_1777' width={this.state.width} height={this.state.height}></canvas>
            </div>
        )
    }
}
