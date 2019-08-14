import React, {Component, PureComponent} from "react";
import "./MapDisplay.css"

class MapDisplay extends Component {
    render() {
        return (
            <div className="dataVisualisation card-body card col-6">
                <video  id="vid" style={{display:'none'}}></video>
                <canvas className="canvasVideo" id="canvas"></canvas><br/>
            </div>
        )
    }
}
export default MapDisplay
