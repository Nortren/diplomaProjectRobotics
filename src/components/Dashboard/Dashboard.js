import React, {Component, PureComponent} from "react";
import './Dashboard.css'
import ReactDOM from 'react-dom';
class ElementsCarouselHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0,
            _testS: []
        };
    }

    componentDidMount(prevProps) {
        this.updateCanvasDiagrams();
    setInterval(()=> {
        this.diagramsUpdate();
    },1000)
    }

    createDiagrams(idCanvas,valueName) {
        const canvas = document.getElementById(idCanvas);
        const context = canvas.getContext("2d");

        const twopi = Math.PI * 2;
        const size = {x: 150, y: 150};
        canvas.width = size.x;
        canvas.height = size.y;
        context.font = "15px Verdana";
        context.fillStyle = "#A0A1A6";
        context.textAlign="center"


        const s = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const dist = 0;

        function circle(linewidth, radius, mod, test, number,valueName) {
            const sum = test.reduce(function (pv, cv) {
                return pv + cv;
            }, 0);
            let pos = 0;
            context.lineWidth = linewidth;

            const dataArray = test ? test : s ;

            context.moveTo(size.x * .5 + radius, size.y * .5);
            for (let i = 0; i < dataArray.length; i++) {

                const letters = '0123456789ABCDEF';
                // #2196f3
                let color = '#2196f';
                for (let i = 0; i < 1; i++) {
                    let colorWord =letters[Math.floor(Math.random() * 16)];
                    color = '#2'+colorWord+'9'+colorWord+colorWord+colorWord;
                }
                context.strokeStyle = color;

                // ArcStart
                let cr = twopi * pos;

                pos += dataArray[i] / sum;

                context.beginPath();
                context.arc(size.x * .5, size.y * .5, radius,
                    (cr + dist) - Math.PI / 2,
                    cr - dist - Math.PI / 2 + twopi * dataArray[i] / sum
                );
                context.stroke();
                context.closePath();
                context.fillText(number || 0 , size.x * .5, size.y * .5);
                context.fillText(valueName, size.x * .5, size.y * .6);
            }
        }

        circle(15, size.x * .5 - 30 * .5, -(0xff / s.length) * .5, this.state._testS,this.state.elementShift,valueName);

    }

    updateCanvasDiagrams() {
        this.createDiagrams('test1','Заряда');
        this.createDiagrams('test2','Сигнал');
        this.createDiagrams('test3','Дистанция');
        this.createDiagrams('test4','Отклик мс');
    }

    diagramsUpdate() {
        this.updateCanvasDiagrams();
        if(this.state._testS.length < 5) {
            this.state._testS.push(this.state.elementShift);
        }
        this.setState({elementShift: this.state.elementShift + 1, _testS: this.state._testS});
    }

    render() {
        return (
            <div className="DashBoard">
                <canvas id="test1"></canvas>
                <canvas id="test2"></canvas>
                <canvas id="test3"></canvas>
                <canvas id="test4"></canvas>
            </div>
        );
    }
}
export default ElementsCarouselHorizontal
