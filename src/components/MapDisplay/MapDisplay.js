import React, {Component, PureComponent} from "react";
import {YMaps, Map, Placemark,Polyline} from "react-yandex-maps";

const mapData = {
    center: [55.824604, 37.648588],
    zoom: 17,
};

const coordinates = [
    [55.824604, 37.648588],
    [55.825120, 37.649305]
];

class MapDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinate: []
        };
    }

    componentDidMount(prevProps) {

        setInterval(() => {
            this.mapUpdate();
        }, 500)

    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate');
    }
    getRandomInt(max) {
        return Math.floor(Math.random(max) * Math.floor(max));
    }
    mapUpdate() {

        this.state.coordinate =[this.state.coordinate[1] || [55.824604, 37.648588],
            this.state.coordinate[2] || [55.824604, 37.648588],
            this.state.coordinate[3] || [55.824604, 37.648588],
            this.state.coordinate[4] || [55.824604, 37.648588],
            this.state.coordinate[5] || [55.824604, 37.648588],
            this.state.coordinate[6] || [55.824604, 37.648588],
            this.state.coordinate[7] || [55.824604, 37.648588],
            this.state.coordinate[8] || [55.824604, 37.648588],
            this._returnArrayLine()];
        if (this.state.coordinate.length < 100) {




        }
        this.setState({coordinate: this.state.coordinate});


    }
    _returnArrayLine(){
        let randomNumberX = this.getRandomInt(999);
        let randomNumberY = this.getRandomInt(999);
        const x = "55.824"+randomNumberX;
        const y = "37.648"+randomNumberY;
        return [x,y]
    }

    render() {

        return (
            <div className="dataVisualisation card-body col-lg-6 col-md-12 col-12">
                <YMaps className="dataVisualisation">
                    <Map defaultState={mapData} style={{width: '100%', height: '100%'}}>
                        <Polyline
                            geometry={this.state.coordinate}
                            options={{
                                balloonCloseButton: false,
                                strokeColor: '#2196f3',
                                strokeWidth: 4,
                                strokeOpacity: 0.5,
                            }}
                        />
                    </Map>
                </YMaps>
                <div id="map"></div>
            </div>
        )
    }
}
export default MapDisplay
