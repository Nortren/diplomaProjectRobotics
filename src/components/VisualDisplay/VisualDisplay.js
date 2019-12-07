import React, {Component, PureComponent} from "react";
import ElementsCarouselHorizontal from "../ElementsCarouselHorizontal/ElementsCarouselHorizontal";
import Dashboard from "../Dashboard/Dashboard";
import VideoTranslation from "../VideoTranslation/VideoTranslation";
import MapDisplay from "../MapDisplay/MapDisplay";

class VisualDisplay extends Component {

    render() {
        return (
            <div className=" col-xl-8 col-md-12 col-12  container p-4 VisualDisplay">
                <div className="row  card-body ">
                    <VideoTranslation />
                   <MapDisplay/>
                </div>
                <div className=' card-body'>
                    <Dashboard/>
                    {/*<ElementsCarouselHorizontal/>*/}
                </div>
            </div>
        );
    }

}
export default VisualDisplay