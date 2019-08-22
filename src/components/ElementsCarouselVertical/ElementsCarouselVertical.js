import React, {Component, PureComponent} from "react";
import './ElementsCarouselVertical.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class ElementsCarouselVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0
        };
    }

    carouselMoveDown(length) {
    this.setState({ elementShift: this.state.elementShift-50 });
    if(this.state.elementShift <= -length){
        this.setState({ elementShift:0 });
    }
}
    carouselMoveUp() {
        this.setState({ elementShift: this.state.elementShift-50 });
        if(this.state.elementShift  <= 0){
            this.setState({ elementShift:0 });
        }
    }
    render() {
        const style = { top: this.state.elementShift };
        const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        const elementContainerWidth = 70;
        const lengthArrayData = test.length*elementContainerWidth;
        return (
            <div>
            <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                <div style={ style } className="carousel_vertical_line">
                    {test.map(function (num) {
                        return <div key={num} className="list-group-item carousel_vertical_line_element">{num}</div>;
                    })}

                </div>

            </div >
                <div className="control_position carousel_vertical card-body" >
                    <a className="carousel-control_left left carousel-control" href="#carousel-id" role="button" data-slide="prev">
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-up" aria-hidden="true" onClick={e => this.carouselMoveUp()}></span>
                    </a>
                    <a className=" carousel-control_right  right carousel-control" href="#carousel-id" role="button" data-slide="next">
                        <span className="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-down" aria-hidden="true" onClick={e => this.carouselMoveDown(lengthArrayData)}></span>
                    </a>
                </div>
            </div>

        );
    }

}



export default ElementsCarouselVertical

