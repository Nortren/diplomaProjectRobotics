import * as React from 'react';
//TODO странное поведение не могу вынести из этого класса
import '../ElementsCarousel/BootstrapModule.css'
import ElementsCarousel from "../ElementsCarousel/ElementsCarousel";
import Dashboard from "../Dashboard/Dashboard";
import Graph from "../Graph/Graph";
import VideoTranslation from "../VideoTranslation/VideoTranslation";
import MapDisplay from "../MapDisplay/MapDisplay";
import * as openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8010');

export default class VisualDisplay extends React.Component {

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

   getBlGraphsData(interval, data) {
      socket.emit('setGraphsData', interval, data);
      socket.on('getGraphsData', (data) => {

         this.setState({graphsDataArray: data.dataGraphs});
         // this.graphsUpdate(data);
      });
   }

   componentDidMount(){
       this.getBlGraphsData(100, {test: 123});
    }

    render() {

        return (
            <div className=" col-xl-8 col-md-12 col-12  container p-4 VisualDisplay">
                <div className="row  card-body ">
                    <VideoTranslation />
                   <MapDisplay/>
                </div>
                <div className=' card-body VisualDisplay-Dashboard'>
                    <ElementsCarousel source={this.state.graphsDataArray} template={Graph} type="horizontal" />
                    {/*<ElementsCarouselHorizontal/>*/}
                </div>
            </div>
        );
    }

}
