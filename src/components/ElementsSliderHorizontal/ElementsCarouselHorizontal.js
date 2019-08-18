import React, {Component, PureComponent} from "react";
import './ElementsCarouselHorizontal.css'
import ReactDOM from 'react-dom';
class ElementsSliderHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stripBg: 0
        };
    }
    carouselMoveLeft() {
    this.setState({ stripBg: this.state.stripBg+128 });
    if(this.state.stripBg >= 0){
        this.setState({ stripBg:0 });
    }
}
    carouselMoveRight() {
        this.setState({ stripBg: this.state.stripBg-128 });
        if(this.state.stripBg <= -3000){
            this.setState({ stripBg:0 });
        }
    }
    render() {
        const style = { left: this.state.stripBg };
        return (
            <div  className="carousel_horizontal card-body card col-12">
                <div  style={ style } className="carousel_horizontal_line row">
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>
                    <div className="card  carousel_horizontal_line_element">123</div>


                </div>
                <div className="row ">
                    <a class="carousel-control_left left carousel-control" href="#carousel-id" role="button" data-slide="prev">
                        <span class="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-left" aria-hidden="true" onClick={e => this.carouselMoveLeft()}></span>
                    </a>
                    <a class=" carousel-control_right  right carousel-control" href="#carousel-id" role="button" data-slide="next">
                        <span class="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-right" aria-hidden="true" onClick={e => this.carouselMoveRight()}></span>
                    </a>
                </div>

            </div>
        );
    }
}
export default ElementsSliderHorizontal
