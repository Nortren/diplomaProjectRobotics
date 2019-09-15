import React, {Component, PureComponent} from "react";
import "./MapDisplay.css"

class MapDisplay extends Component {
    render() {
        return (
            <div className="dataVisualisation card-body card col-lg-6 col-md-12 col-12">
                <video  id="vid" style={{display:'none'}}></video>
                {/*<canvas className="canvasVideo" id="canvas"></canvas><br/>*/}
                <img src={require('../../images/map.png')} className="canvasVideo"  alt="fireSpot"/>
            </div>
        )
    }
}
export default MapDisplay
