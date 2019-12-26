import * as React from 'react';
import {YMaps, Map, Placemark,Polyline} from "react-yandex-maps";

export default class MapOfBuilding extends React.Component {
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
        // console.log('componentDidUpdate');
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
123
            </div>
        )
    }
}
