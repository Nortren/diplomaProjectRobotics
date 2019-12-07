import React, {Component, PureComponent} from "react";
import './ElementsCarouselVertical.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class ElementsCarouselVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0,
            _testArrayGraphs_1: [],
            _testArrayGraphs_2: [],
            _testArrayGraphs_3: [],
            _testArrayGraphs_4: []
        };
    }

    componentDidMount(prevProps) {
        setInterval(() => {
            this.graphsUpdate();
        }, 100)

    }

    componentDidUpdate(prevProps) {

    }

    drawsGraphs(idCanvas, dataGraphs) {
        var graficsArray = {
            g1: dataGraphs,
            // g2: {1: 11, 2: 10, 3: 8, 4: 6, 5: 13, 6: 12, 7: 22, 8: 18, 9: 16, 10: 15},
            // g3: {1: 5, 2: 4, 3: 2, 4: 1, 5: 7, 6: 6, 7: 16, 8: 12, 9: 10, 10: 9},
            // g4: {1: 3, 2: 4, 3: 8, 4: 12, 5: 15, 6: 18, 7: 21, 8: 22, 9: 25, 10: 27}
        }
        //цвета линий
        const colors = ['#2196f3', '#0f0', '#00f', '#0ff'];

        const canvas = document.getElementById(idCanvas);
        const gr = canvas.getContext("2d");
        //Тут мы узнаем текущий размер окна где распологается график чтоб отрисовать размеры canvas
        const bodySize = document.getElementsByClassName('carousel_vertical_line_element')[0];
        canvas.setAttribute('width', bodySize.offsetWidth);
        canvas.setAttribute('height', bodySize.offsetHeight * 0.65);
        const maxCount = 35 + 10;
        const x0 = 30;
        const y0 = 30;
        const width = canvas.width - 200;
        const height = canvas.height - 100;
        const stepY = Math.round(height / bodySize.offsetHeight*10);
        const stepX = Math.round(width / bodySize.offsetWidth*10);

//         gr.beginPath();
// //Вертикальная линия
//         gr.moveTo(x0, y0);
//         gr.lineTo(x0, height + y0);
// //горизонтальная линия
//         gr.lineTo(width + x0, height + y0);
//
//         let m = 0;
//         const x_max = 10;
// //нижняя разметка и цифры
//         for (let i = x0; m < x_max; i += stepX) {
//             m ++;
//             gr.moveTo(i, height + y0);
//             gr.lineTo(i, height + y0 + 15);
//             gr.fillText(m, i + 3, height + y0 + 15);
//         }
//         gr.lineWidth = 2;
//         gr.stroke();
//         gr.closePath();
//рисуются кривые
        //TODO Сделать нормальный обход данных
        let nr_color = 0;
        for (let graph in graficsArray) {
            gr.beginPath();

            for (let counData in graficsArray[graph]) {
                //Чистим графики
                if(this.state._testArrayGraphs_1.length > 80){
                    this.setState({_testArrayGraphs_1: []});
                    this.setState({_testArrayGraphs_2: []});
                    this.setState({_testArrayGraphs_3: []});
                    this.setState({_testArrayGraphs_4: []});
                }
                const count = graficsArray[graph][counData];
                const x = x0 + ((counData - 1) * stepX);
                const y = y0 + (height - count * stepY);

                if (1 == counData)
                    gr.moveTo(x, y);
                else
                    gr.lineTo(x, y);

                // gr.arc(x, y, 2, 0, 2 * Math.PI, false);
                // gr.fillText(count, x-5, y-5);//текст над точками
                // gr.fillText(count, x0 - 15, y);//текст у боковой линии

            }

            gr.strokeStyle = colors[nr_color]; //цвет линии
            nr_color++;
            gr.lineWidth = 3;//толщина линии
            gr.stroke();
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    graphsUpdate() {
        this.updateCanvasGraphs();
        if (this.state._testArrayGraphs_1.length < 100) {
            this.state._testArrayGraphs_1.push(this.getRandomInt(30));
            this.state._testArrayGraphs_2.push(this.getRandomInt(50));
            this.state._testArrayGraphs_3.push(this.getRandomInt(10));
            this.state._testArrayGraphs_4.push(this.getRandomInt(60));
        }
        this.setState({_testArrayGraphs_1: this.state._testArrayGraphs_1});
        this.setState({_testArrayGraphs_2: this.state._testArrayGraphs_2});
        this.setState({_testArrayGraphs_3: this.state._testArrayGraphs_3});
        this.setState({_testArrayGraphs_4: this.state._testArrayGraphs_4});
    }

    updateCanvasGraphs() {
        this.drawsGraphs(1, this.state._testArrayGraphs_1);
        this.drawsGraphs(2, this.state._testArrayGraphs_2);
        this.drawsGraphs(3, this.state._testArrayGraphs_3);
        this.drawsGraphs(4, this.state._testArrayGraphs_4);
    }

    carouselMoveDown(length) {
        this.setState({elementShift: this.state.elementShift - 150});
        if (this.state.elementShift <= -length) {
            this.setState({elementShift: 0});
        }
    }

    carouselMoveUp() {
        this.setState({elementShift: this.state.elementShift - 150});
        if (this.state.elementShift <= 0) {
            this.setState({elementShift: 0});
        }
    }

    render() {
        const style = {top: this.state.elementShift};
        const test = [{id: 1, name: 'Test_1', value: 1}, {id: 2, name: 'Test_2', value: 2},
            {id: 3, name: 'Test_3', value: 3}, {id: 4, name: 'Test_4', value: 4}];
        const elementContainerWidth = 300;
        const lengthArrayData = test.length * elementContainerWidth;
        return (
            <div>
                <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                    <div style={ style } className="carousel_vertical_line">

                        {test.map(function (object) {
                            return <div key={object.id} className="list-group-item carousel_vertical_line_element">
                                <div className="carousel_vertical_line_element-name">{object.name}</div>
                                <div className="carousel_vertical_line_element-value">{object.value}</div>
                                <canvas id={object.id}></canvas>
                            </div>;
                        })}

                    </div>

                </div >
                <div className="control_position carousel_vertical card-body">
                    <a className="carousel-control_left left carousel-control" href="#carousel-id" role="button"
                       data-slide="prev">
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-up"
                              aria-hidden="true" onClick={e => this.carouselMoveUp()}></span>
                    </a>
                    <a className=" carousel-control_right  right carousel-control" href="#carousel-id" role="button"
                       data-slide="next">
                        <span className="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-down"
                              aria-hidden="true" onClick={e => this.carouselMoveDown(lengthArrayData)}></span>
                    </a>
                </div>
            </div>

        );
    }

}


export default ElementsCarouselVertical

