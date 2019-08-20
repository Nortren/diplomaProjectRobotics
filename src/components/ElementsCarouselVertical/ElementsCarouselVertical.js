import React, {Component, PureComponent} from "react";
import './ElementsCarouselVertical.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class ElementsCarouselVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stripBg: 0
        };
    }

    carouselMoveDown(length) {
    this.setState({ stripBg: this.state.stripBg-50 });
    if(this.state.stripBg <= -length){
        this.setState({ stripBg:0 });
    }
}
    carouselMoveUp(length) {
        this.setState({ stripBg: this.state.stripBg-50 });
        if(this.state.stripBg  <= 0){
            this.setState({ stripBg:0 });
        }
    }
    render() {
        const style = { top: this.state.stripBg };
        const test = [1,2];
        const lengthArrayData = test.length*50;
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
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-up" aria-hidden="true" onClick={e => this.carouselMoveUp(lengthArrayData)}></span>
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

