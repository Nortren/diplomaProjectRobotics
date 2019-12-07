import React, {Component, PureComponent} from "react";
import './ElementsCarouselHorizontal.css'
import ReactDOM from 'react-dom';
class ElementsCarouselHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0
        };
    }
    carouselMoveLeft() {
    this.setState({ elementShift: this.state.elementShift+128 });
    if(this.state.elementShift >= 0){
        this.setState({ elementShift:0 });
    }
}
    carouselMoveRight(length) {
        this.setState({ elementShift: this.state.elementShift-128 });
        if(this.state.elementShift <= -length){
            this.setState({ elementShift:0 });
        }
    }
    render() {
        const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        const elementContainerWidth = 70;
        const lengthArrayData = test.length*elementContainerWidth;

        const style = { left: this.state.elementShift };
        return (
            <div>
            <div  className="carousel_horizontal card-body  col-12">
                <div  style={ style } className="carousel_horizontal_line row">
                    {test.map(function (num) {
                        return <div key={num} className=" carousel_horizontal_line_element">{num}</div>;
                    })}
                </div>

            </div>
                <div className="carousel-control_position carousel_horizontal card-body  col-12 ">
                    <a className="carousel-control_left left carousel-control" href="#carousel-id" role="button" data-slide="prev">
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-left" aria-hidden="true" onClick={e => this.carouselMoveLeft()}></span>
                    </a>
                    <a className=" carousel-control_right  right carousel-control" href="#carousel-id" role="button" data-slide="next">
                        <span className="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-right" aria-hidden="true" onClick={e => this.carouselMoveRight(lengthArrayData)}></span>
                    </a>
                </div>
            </div>
        );
    }
}
export default ElementsCarouselHorizontal
