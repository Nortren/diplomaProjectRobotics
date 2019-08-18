import React, {Component, PureComponent} from "react";
import './ElementsCarouselVertical.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class ElementsSliderVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stripBg: 0
        };
    }

    carouselMoveDown() {
    this.setState({ stripBg: this.state.stripBg-128 });
    if(this.state.stripBg <= -3000){
        this.setState({ stripBg:0 });
    }
}
    carouselMoveUp() {
        this.setState({ stripBg: this.state.stripBg-128 });
        if(this.state.stripBg  <= 0){
            this.setState({ stripBg:0 });
        }
    }
    render() {
        const style = { top: this.state.stripBg };
        return (
            <div>
            <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                <div style={ style } className="carousel_vertical_line">
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                    <div className="list-group-item carousel_vertical_line_element">testElement</div>
                </div>

            </div >
                <div className="control_position carousel_vertical card-body" >
                    <a class="carousel-control_left left carousel-control" href="#carousel-id" role="button" data-slide="prev">
                        <span class="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-up" aria-hidden="true" onClick={e => this.carouselMoveUp()}></span>
                    </a>
                    <a class=" carousel-control_right  right carousel-control" href="#carousel-id" role="button" data-slide="next">
                        <span class="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-down" aria-hidden="true" onClick={e => this.carouselMoveDown()}></span>
                    </a>
                </div>
            </div>

        );
    }

}



export default ElementsSliderVertical

