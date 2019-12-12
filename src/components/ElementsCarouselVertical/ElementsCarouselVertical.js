import React, { Component, PureComponent } from 'react';
import './ElementsCarouselVertical.css';
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
      socket.emit('setGraphsData', 100, { test: 11 });
      socket.on('getGraphsData', (data) => {
         this.graphsUpdate(data);
      });

   }

   drawsGraphs(idCanvas, dataGraphs, color) {
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
      //TODO Сделать нормальный обход данных

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
   maxDataNumber(arrayData) {

      let min = arrayData[0];
      let max = min;
      for (let i = 1; i < arrayData.length; ++i) {
         if (arrayData[i] > max) max = arrayData[i];
         if (arrayData[i] < min) min = arrayData[i];
      }
      return max;
   }
   parseData(graphsName, graphValue, graphMaxValue, serialNumber) {
      //Чистим графики
      if (this.state[graphsName] && this.state[graphsName].length > 79) {
         this.state[graphsName] = [];
      }

      if (!this.state[graphsName]) {
         this.state[graphsName] = [];
      }
      //Tck
      if(graphValue) {
         this.state[graphsName].push(graphValue);
      }
      this.setState({
         [graphsName]: this.state[graphsName],
         ['maxValueGraphs_'+serialNumber]:this.maxDataNumber(this.state[graphsName])
      });
      this.updateCanvasGraphs(serialNumber, this.state[graphsName], serialNumber - 1);
   }

   graphsUpdate(graphsData) {
      let serialNumber = 0;
      for (let graph in graphsData.dataGraphs) {
         serialNumber++;
         const graphs = graphsData.dataGraphs[graph];
         const graphValue = graphs.stubGraphsData;
         const graphMaxValue = graphs.maxValueGraphs;
         this.parseData(graph, graphValue, graphMaxValue, serialNumber);

      }
   }

   updateCanvasGraphs(idCanvas, graphsArray, colorNumber) {
      if (this.state.stubGraphsName_1) {
         this.drawsGraphs(idCanvas, graphsArray, colorNumber);
      }
   }

   carouselMoveDown(length) {
      this.setState({ elementShift: this.state.elementShift - 150 });
      if (this.state.elementShift <= -length) {
         this.setState({ elementShift: 0 });
      }
   }

   carouselMoveUp() {
      this.setState({ elementShift: this.state.elementShift - 150 });
      if (this.state.elementShift <= 0) {
         this.setState({ elementShift: 0 });
      }
   }

   render() {
      const style = { top: this.state.elementShift };
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
            <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
               <div style={style} className="carousel_vertical_line">

                  {test.map(function(object) {
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

            </div>
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

export default ElementsCarouselVertical;

