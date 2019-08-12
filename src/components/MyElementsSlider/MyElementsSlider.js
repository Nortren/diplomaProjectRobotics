import React, {Component, PureComponent} from "react";
import './MyElementsSlider.css'
class MyElementsSlider extends Component {

//https://itchief.ru/examples/lab.php?topic=javascript&file=chiefslider-example-2 слайдер
	render() {
		const styleElement = {height: '250px', background: 'orange'};
		return (
			<div className="col-4  ">
				<div className="slider">
					<div className="slider__wrapper">
						<div className="slider__item">
							<div style={styleElement}>1</div>
							<div style={styleElement}>1</div>
							<div style={styleElement}>1</div>
							<div style={styleElement}>1</div>
							<div style={styleElement}>1</div>
						</div>

					</div>
					<a className="slider__control slider__control_left" href="#" role="button"></a>
					<a className="slider__control slider__control_right slider__control_show" href="#" role="button"></a>
				</div>
			</div>
		);
	}

}

export default MyElementsSlider