import React, {Component, PureComponent} from "react";
import "./VideoTranslation.css"

class VideoTranslation extends Component {
    render() {
        return (
            <div className="dataVisualisation card-body card col-lg-6 col-12">
                <video  id="vid" style={{display:'none'}}></video>
                <canvas className="canvasVideo" id="canvas"></canvas><br/>
            </div>
        )
    }
}
export default VideoTranslation
