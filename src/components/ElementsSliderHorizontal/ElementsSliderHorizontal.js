import React, {Component, PureComponent} from "react";
import './ElementsSliderHorizontal.css'
import ReactDOM from 'react-dom';
class ElementsSliderHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stripBg: 0
        };
    }
    sliderRight() {
    this.setState({ stripBg: this.state.stripBg+128 });
    if(this.state.stripBg >= 0){
        this.setState({ stripBg:0 });
    }
}
    sliderLeft() {
        this.setState({ stripBg: this.state.stripBg-128 });
        if(this.state.stripBg <= -3000){
            this.setState({ stripBg:0 });
        }
    }
    render() {
        const style = { left: this.state.stripBg };
        return (
            <div  className="slider_horizontal card-body card col-12">
                <div  style={ style } className="slider_horizontal_line row">
                    <div className="card card-body slider_horizontal_line_element">123</div>
                    <div className="card card-body slider_horizontal_line_element">123</div>
                    <div className="card card-body slider_horizontal_line_element">123</div>
                    <div className="card card-body slider_horizontal_line_element">123</div>
                    <div className="card card-body slider_horizontal_line_element">123</div>
                    <div className="card card-body slider_horizontal_line_element">123</div>
                    <div className="card card-body slider_horizontal_line_element">123</div>
                </div>
                <div className="row ">
                    <button id="slider-left" className="col-6" onClick={e => this.sliderRight()}>left</button>
                <button id="slider-left" className="col-6" onClick={e => this.sliderLeft()}>right</button>
                </div>
            </div>
        );
    }
}
export default ElementsSliderHorizontal
