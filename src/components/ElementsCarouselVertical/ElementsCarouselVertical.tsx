import * as React from 'react';
import './ElementsCarouselVertical.css';
import Chart from '../Chart/Chart'

class ElementsCarouselVertical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0,
        };
    }

    carouselMoveDown(length: number) {
        this.setState({elementShift: this.state.elementShift - 150});
        if (this.state.elementShift <= -length) {
            this.setState({elementShift: 0});
        }
    }

    carouselMoveUp() {
        this.setState({elementShift: this.state.elementShift - 150});
        if (this.state.elementShift <= 0) {
            this.setState({elementShift: 0});
        }
    }

    render() {
        const style = {top: this.state.elementShift};
        //TODO эти данные должен отдавать сервер

        const elementContainerWidth = 300;
        const lengthArrayData = this.props.source.length * elementContainerWidth;
        return (
            <div>
                <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                    <div style={style} className="carousel_vertical_line">

                        {this.props.source.map(function (object) {
                            // return <Chart name={object.name} id={object.id} key={object.id}/>
                            return <Chart name={object.name} id={object.id} key={object.id}/>
                        })}

                    </div>

                </div>
                <div className="control_position carousel_vertical card-body">
                    <a className="carousel-control_left left carousel-control" href="#carousel-id" role="button"
                       data-slide="prev">
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-up"
                              aria-hidden="true" onClick={e => this.carouselMoveUp()}></span>
                    </a>
                    <a className=" carousel-control_right  right carousel-control" href="#carousel-id" role="button"
                       data-slide="next">
                        <span className="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-down"
                              aria-hidden="true" onClick={e => this.carouselMoveDown(lengthArrayData)}></span>
                    </a>
                </div>
            </div>

        );
    }
}

export default ElementsCarouselVertical;

