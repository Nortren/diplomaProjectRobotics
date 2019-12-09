import React, { Component, PureComponent } from 'react';

class VideoTranslation extends Component {
   componentDidMount() {
      const canvas = document.querySelector('#canvas');
      let ctx = canvas.getContext('2d');

      setInterval((a) => {
         this.cameraRecording(this.ctx);
      }, 1000);
      setInterval((a) => {
         this.drawCanvasCamera(ctx);
      }, 100);

   }

   drawCanvasCamera(ctx) {
      let videoImg = document.querySelector('video');
      ctx.drawImage(videoImg, 0, 0);
      var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
// инвертируем каждый пиксель
      for (let n = 0; n < data.width * data.height; n++) {
         var index = n * 4;
         data.data[index + 0] = 255 - data.data[index + 0];
         data.data[index + 1] = 255 - data.data[index + 1];
         data.data[index + 2] = 255 - data.data[index + 2];
         //don't touch the alpha
      }

// устанавливаем данные обратно
      ctx.putImageData(data, 0, 0);
   }

   cameraRecording() {
      if (navigator.webkitGetUserMedia != null) {
         var options = {
            video: true,
            audio: true
         };

         // запрашиваем доступ к веб-камере
         navigator.webkitGetUserMedia(options,
            function(stream) {
               // получаем тег video
               var video = document.querySelector('video');
               // включаем поток в магический URL
               video.srcObject = stream;
               video.play();


            },
            function(e) {
               console.log('error happened');
            }
         );
      }
   }

   render() {
      return (
         <div className="dataVisualisation  card-body  col-lg-6 col-12">
            <video width="100%" height="480" id="vid" style={{ display: 'none' }}></video>
            <canvas width="640" height="480" className="canvasVideo" id="canvas"></canvas>
            {/*<img src={require('../../images/camera.png')} className="canvasVideo"  alt="fireSpot"/>*/}
            <br/>


            <button onClick={e => this.startBroadcasting()}>Start Broadcasting</button>
            <button onClick={e => this.stopBroadcasting()}>Stop Broadcasting</button>
         </div>
      );
   }
}

export default VideoTranslation;
