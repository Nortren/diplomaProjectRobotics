import React, {Component, PureComponent} from "react";
import MyElementsSlider from "../MyElementsSlider/MyElementsSlider";
import VideoTranslation from "../VideoTranslation/VideoTranslation";
import MapDisplay from "../MapDisplay/MapDisplay";

class VisualDisplay extends Component {

    render() {
        return (
            <div className=" col-8 card  ">
                <div className="row  card-body ">
                    <VideoTranslation/>
                   <MapDisplay/>
                </div>
                <div className=' card-body'>
                    <MyElementsSlider/>
                </div>
            </div>
        );
    }

}
export default VisualDisplay