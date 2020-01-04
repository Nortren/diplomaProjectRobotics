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
          mapObjectPosition:{}
      };

   }

   componentDidMount(){
       const BL = new BusinessLogic();
       BL.getBlGraphsData(1000, {testData: 'test'},(data)=>{
           this.setState({graphsDataArray: data.dataGraphs});
       });
       BL.getBlObjectPosition(50, {testData: 'test'},(data)=>{
           this.setState({mapObjectPosition: data});
       });
    }
    render() {

        return (
            <div className=" col-xl-8 col-md-12 col-12  container p-4 VisualDisplay">
                <div className="row  card-body VisualDisplay_card">
                    <VideoTranslation />
                    {/*<MapDisplay/>*/}
                   <MapOfBuilding source={this.state.mapObjectPosition.dataObjectPosition} />
                </div>
                <div className=' card-body VisualDisplay-Dashboard'>
                    <ElementsCarousel source={this.state.graphsDataArray} template={Graph} type="horizontal" />
                    {/*<ElementsCarouselHorizontal/>*/}
                </div>
            </div>
        );
    }

}
