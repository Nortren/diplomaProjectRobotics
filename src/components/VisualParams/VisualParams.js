import React, {Component, PureComponent} from "react";
import ElementsCarousel from '../ElementsCarousel/ElementsCarousel'
import Chart from '../Chart/Chart';
import * as openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8010');


export default class VisualParams extends Component {

   constructor(props) {
      super(props);
      this.state = {
         graphsDataArray: {},

      };

   }

   /**
    * Запрос на бизнес логику для получения данных и построения по ним графиков
    * @param interval частота обращения на БЛ
    * @param data данные для отправки на сервер
    */

   getBlChartData(interval, data) {
      socket.emit('setChartData', interval, data);
      socket.on('getChartData', (data) => {
         this.setState({graphsDataArray: data.dataGraphs});
      });
   }

   componentDidMount(){
      this.getBlChartData(100, {test: 123});
   }

   render() {
      let typePosition = "vertical";
      if(screen.width < 1024){
         typePosition = "horizontal"
      }

        return(
            <div className="col-lg-12 col-xl-3  col-md-12 col-12 container  p-4 VisualParams">
               <ElementsCarousel source={this.state.graphsDataArray} template={Chart} type={typePosition}/>
            </div>
        );
    }

}

