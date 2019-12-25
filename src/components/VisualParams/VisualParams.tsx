import * as React from 'react';
import ElementsCarousel from '../ElementsCarousel/ElementsCarousel'
import BusinessLogic from "../BusinessLogic";
import Chart from '../Chart/Chart';
import * as openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8010');

interface Interface {
    
}
/**
 * Компонент отображения гор
 */
export default class VisualParams extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         graphsDataArray: {},

      };

   }

   componentDidMount(){
       new BusinessLogic().getBlChartData(100, {test: 123},(data)=>{this.setState({graphsDataArray: data.dataGraphs})});
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

