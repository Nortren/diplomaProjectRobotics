import * as React from 'react';
import {YMaps, Map, Placemark,Polyline} from "react-yandex-maps";

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
        img.src = "src/images/plan.jpg";
        this.canvas = document.getElementById('canvas_1777');
        // контекст, через который будем управлять содержимым canvas
        const contextCanvas = this.canvas.getContext('2d');
        contextCanvas.drawImage(img,100,100);
    }

    render() {

        return (
            <div className="dataVisualisation card-body col-lg-6 col-md-12 col-12">
                <canvas id='canvas_1777' width="150" height="150"></canvas>
            </div>
        )
    }
}
