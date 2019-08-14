import React, {Component, PureComponent} from "react";
// import './MyElementsSlider.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class MyElementsSlider extends Component {


    render() {




        return (

            <div id="slider">
                <div id="polosa" className="row">
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                    <div className="card card-body">123</div>
                </div>
                <button id="slider-left">left</button>
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
