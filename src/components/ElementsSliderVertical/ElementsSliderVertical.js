import React, {Component, PureComponent} from "react";
import './ElementsSliderVertical.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class ElementsSliderVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stripBg: 0
        };
    }

    sliderRight() {
    this.setState({ stripBg: this.state.stripBg+128 });
    if(this.state.stripBg <= -3000){
        this.setState({ stripBg:0 });
    }
}
    sliderLeft() {
        this.setState({ stripBg: this.state.stripBg-128 });
        if(this.state.stripBg  >= 0){
            this.setState({ stripBg:0 });
        }
    }
    render() {
        const style = { top: this.state.stripBg };
        return (
            <div>
            <div id="slider" className="card-body card col-12 sensorsList list-group list-group-flush">
                <div id="polosa" style={ style } className="">
                    <div className="list-group-item ">testElement</div>
                    <div className="list-group-item ">testElement</div>
                    <div className="list-group-item ">testElement</div>
                    <div className="list-group-item ">testElement</div>
                    <div className="list-group-item ">testElement</div>
                    <div className="list-group-item ">testElement</div>
                    <div className="list-group-item ">testElement</div>

                </div>

            </div>
                <div className="row ">
                    <button id="slider-left" className="col-6" onClick={e => this.sliderRight()}>down</button>
                    <button id="slider-left" className="col-6" onClick={e => this.sliderLeft()}>up</button>

                </div>
            </div>

        );
    }

}



export default ElementsSliderVertical

