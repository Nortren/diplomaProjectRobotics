import React, {Component, PureComponent} from "react";
import './MyElementsSlider.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class MyElementsSlider extends Component {

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
            <div id="slider" className="card-body card col-12">
                <div id="polosa" style={ style } className="row">
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                </div>
                <div className="row ">
                    <button id="slider-left" className="col-6" onClick={e => this.sliderLeft()}>left</button>
                <button id="slider-left" className="col-6" onClick={e => this.sliderRight()}>right</button>

                </div>
            </div>


        );
    }

}



export default MyElementsSlider


/*
 //https://reactjsexample.com/react-simple-infinite-carousel-with-lazy-loading-and-responsive-support/ слайдер
 <InfiniteCarousel
 breakpoints={[
 {
 breakpoint: 3,
 settings: {
 slidesToShow: 2,
 slidesToScroll: 2,
 },
 },
 {
 breakpoint: 768,
 settings: {
 slidesToShow: 3,
 slidesToScroll: 3,
 },
 },
 ]}
 dots={true}
 showSides={true}
 sidesOpacity={.5}
 sideSize={.1}
 slidesToScroll={1}
 slidesToShow={4}
 vertical={true}
 scrollOnDevice={true}
 >
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>
 <div className=" card card-body">testdata</div>

 </InfiniteCarousel>*/
