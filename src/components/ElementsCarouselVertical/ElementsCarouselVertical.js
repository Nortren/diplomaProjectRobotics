import React, {Component, PureComponent} from "react";
import './ElementsCarouselVertical.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';


import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8010');

class ElementsCarouselVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0,
        };
    }

    componentDidMount(prevProps) {
        // setInterval(() => {
        //     this.graphsUpdate();
        // }, 100)


        socket.emit('setGraphsData', 150, {test: 11});
        socket.on('getGraphsData', (data) => {
            // console.log('getGraphsData', data, 1)
            this.graphsUpdate(data);
        });

    }

    componentDidUpdate(prevProps) {

    }

    drawsGraphs(idCanvas, dataGraphs, color) {
        var graficsArray = {
            g1: dataGraphs,
            // g2: {1: 11, 2: 10, 3: 8, 4: 6, 5: 13, 6: 12, 7: 22, 8: 18, 9: 16, 10: 15},
            // g3: {1: 5, 2: 4, 3: 2, 4: 1, 5: 7, 6: 6, 7: 16, 8: 12, 9: 10, 10: 9},
            // g4: {1: 3, 2: 4, 3: 8, 4: 12, 5: 15, 6: 18, 7: 21, 8: 22, 9: 25, 10: 27}
        }
        //цвета линий
        const colors = ['#2196f3', '#1CC39C', '#FF5F62', '#2196f3'];

        const canvas = document.getElementById(idCanvas);
        const gr = canvas.getContext("2d");
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
        //TODO Сделать нормальный обход данных
        for (let graph in graficsArray) {
            gr.beginPath();

            for (let counData in graficsArray[graph]) {
                //Чистим графики
                if (this.state.stubGraphsName_1.length > 80) {
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
            }
            gr.strokeStyle = colors[color]; //цвет линии
            gr.lineWidth = 3;//толщина линии
            gr.stroke();
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    stubDataGraphsGenerator(graphsName, graphValue, graphMaxValue) {
        this.updateCanvasGraphs();
        if (this.state[graphsName] && this.state[graphsName].length < 100) {
            this.state[graphsName] = graphValue;
        }
        this.setState({[graphsName]: graphValue, [graphsName+'_maxValue']: graphMaxValue});
    }

    graphsUpdate(graphsData) {
        for(let graph in graphsData.dataGraphs){
            const graphs = graphsData.dataGraphs[graph];
            const graphValue = graphs.stubGraphsData;
            const graphMaxValue = graphs.maxValueGraphs;
            this.stubDataGraphsGenerator(graph, graphValue, graphMaxValue)

        }
    }

    updateCanvasGraphs() {
        if(this.state.stubGraphsName_1) {
            this.drawsGraphs(1, this.state.stubGraphsName_1, 0);
            this.drawsGraphs(2, this.state.stubGraphsName_2, 1);
            this.drawsGraphs(3, this.state.stubGraphsName_3, 2);
            this.drawsGraphs(4, this.state.stubGraphsName_4, 3);
        }
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
        const test = [{id: 1, name: 'Давление', value: this.state.stubGraphsName_1_maxValue}, {
            id: 2,
            name: 'Температура',
            value: this.state.stubGraphsName_2_maxValue
        },
            {id: 3, name: 'Радиационный фон', value: this.state.stubGraphsName_3_maxValue}, {
                id: 4,
                name: 'Концентрация вредных веществ',
                value: this.state.stubGraphsName_4_maxValue
            }];
        const elementContainerWidth = 300;
        const lengthArrayData = test.length * elementContainerWidth;
        return (
            <div>
                <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                    <div style={ style } className="carousel_vertical_line">

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

