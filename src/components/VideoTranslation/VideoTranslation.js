import React, {Component, PureComponent} from "react";
import "./VideoTranslation.css";


class VideoTranslation extends Component {
    componentDidMount() {
        var video = document.querySelector("#vid"),
            canvas = document.querySelector('#canvas'),
            // ctx = canvas.getContext('2d'),
            localMediaStream = null,
            onCameraFail = function (e) {
                console.log('Camera did not work.', e); // Исключение на случай, если камера не работает
            };
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({video: true}, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, onCameraFail);

        var cameraInterval = setInterval(function () {
            snapshot();
        }, 1);

        function snapshot() {
            if (localMediaStream) {
                // ctx.drawImage(video, 0, 0);
            }
        }

        // И добавим обработчики кнопок начала и завершения вещания
        function startBroadcasting() {
            broadcastingTimer = setInterval(sendSnapshot, 1);
        }

        function stopBroadcasting() {
            clearInterval(broadcastingTimer);
        }
    }

    render() {
        return (
            <div className="dataVisualisation  card-body card col-lg-6 col-12">
                <video id="vid"  style={{display: 'none'}}></video>
                {/*<canvas className="canvasVideo" id="canvas"></canvas>*/}
                <img src={require('../../images/camera.png')} className="canvasVideo"  alt="fireSpot"/>
                <br/>



                {/*<button onClick={e => this.startBroadcasting()}>Start Broadcasting</button>*/}
                {/*<button onClick={e => this.stopBroadcasting()}>Stop Broadcasting</button>*/}
            </div>
        )
    }
}
export default VideoTranslation
