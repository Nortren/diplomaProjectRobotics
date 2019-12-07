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
        this.carouselMoveRight();
    },1)
    }

    createDiagrams(idCanvas) {
        const canvas = document.getElementById(idCanvas);
        const context = canvas.getContext("2d");

        const twopi = Math.PI * 2;
        const size = {x: 150, y: 150};
        canvas.width = size.x;
        canvas.height = size.y;
        context.font = "30px Verdana";
        context.fillStyle = "#A0A1A6";
        const s = [1, 2, 3, 4, 5, 6, 7, 8, 9];


        const sum = s.reduce(function (pv, cv) {
            return pv + cv;
        }, 0);

        const dist = 0;

        function circle(linewidth, radius, mod, test) {
            const sum = test.reduce(function (pv, cv) {
                return pv + cv;
            }, 0);
            let pos = 0;
            context.lineWidth = linewidth;
            context.fillText(test[test.length - 1], size.x * .4, size.y * .5);
            context.moveTo(size.x * .5 + radius, size.y * .5);
            for (let i = 0; i < test.length; i++) {

                // let color = '#21' + i + '6f3';
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                context.strokeStyle = color;

                // ArcStart
                let cr = twopi * pos;
                pos += test[i] / sum;

                context.beginPath();
                context.arc(size.x * .5, size.y * .5, radius,
                    (cr + dist) - Math.PI / 2,
                    cr - dist - Math.PI / 2 + twopi * test[i] / sum
                );
                context.stroke();
                context.closePath();
            }
        }

        circle(15, size.x * .5 - 30 * .5, -(0xff / s.length) * .5, this.state._testS);

    }

    updateCanvasDiagrams() {
        this.createDiagrams('test1');
        this.createDiagrams('test2');
        this.createDiagrams('test3');
        this.createDiagrams('test4');
    }

    carouselMoveLeft() {
        this.updateCanvasDiagrams();
        this.state._testS.push(this.state.elementShift);
        this.setState({elementShift: this.state.elementShift - 1, _testS: this.state._testS});

    }

    carouselMoveRight() {
        this.updateCanvasDiagrams();
        this.state._testS.push(this.state.elementShift);
        this.setState({elementShift: this.state.elementShift + 1, _testS: this.state._testS});
    }

    render() {
        const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        const elementContainerWidth = 70;
        const lengthArrayData = test.length * elementContainerWidth;

        const style = {top: this.state.elementShift};
        return (
            <div className="DashBoard">
                <canvas style={ style } id="test1"></canvas>
                <canvas id="test2"></canvas>
                <canvas id="test3"></canvas>
                <canvas id="test4"></canvas>
                <div className="control_position carousel_vertical card-body">
                    <a className="carousel-control_left left carousel-control" href="#carousel-id" role="button"
                       data-slide="prev">
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-up"
                              aria-hidden="true" onClick={e => this.carouselMoveLeft()}></span>
                    </a>
                    <a className=" carousel-control_right  right carousel-control" href="#carousel-id" role="button"
                       data-slide="next">
                        <span className="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-down"
                              aria-hidden="true" onClick={e => this.carouselMoveRight(lengthArrayData)}></span>
                    </a>
                </div>
            </div>
        );
    }
}
export default ElementsCarouselHorizontal
