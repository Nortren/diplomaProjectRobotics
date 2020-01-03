import * as React from 'react';
//TODO странное поведение не могу вынести из этого класса
import '../ElementsCarousel/BootstrapModule.css'
import ElementsCarousel from "../ElementsCarousel/ElementsCarousel";
import Dashboard from "../Dashboard/Dashboard";
import Graph from "../Graph/Graph";
import VideoTranslation from "../VideoTranslation/VideoTranslation";
import MapDisplay from "../MapDisplay/MapDisplay";
import MapOfBuilding from "../MapOfBuilding/MapOfBuilding";
import BusinessLogic from "../BusinessLogic";
import * as openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8010');

export default class VisualDisplay extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         graphsDataArray: {},

      };

   }

   componentDidMount(){
       new BusinessLogic().getBlGraphsData(1000, {testData: 'test'},(data)=>{
           this.setState({graphsDataArray: data.dataGraphs});
       });
    }
    render() {

        return (
            <div className=" col-xl-8 col-md-12 col-12  container p-4 VisualDisplay">
                <div className="row  card-body ">
                    <VideoTranslation />
                    {/*<MapDisplay/>*/}
                   <MapOfBuilding/>
                </div>
                <div className=' card-body VisualDisplay-Dashboard'>
                    <ElementsCarousel source={this.state.graphsDataArray} template={Graph} type="horizontal" />
                    {/*<ElementsCarouselHorizontal/>*/}
                </div>
            </div>
        );
    }

}
