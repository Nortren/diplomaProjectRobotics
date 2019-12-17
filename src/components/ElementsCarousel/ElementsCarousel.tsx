import * as React from 'react';

//TODO доделать горизонтальный и переключение опциями
/**
 * Универсальный компонент слайдера(вертикальный/горизонтальный)
 */

export default class ElementsCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elementShiftVertical: 0,
            elementShiftHorizontal: 0,
        };
    }

    carouselMoveDown(length: number) {
        this.setState({elementShiftVertical: this.state.elementShiftVertical - 150});
        if (this.state.elementShiftVertical <= -length) {
            this.setState({elementShiftVertical: 0});
        }
    }

    carouselMoveUp() {
        this.setState({elementShiftVertical: this.state.elementShiftVertical - 150});
        if (this.state.elementShiftVertical <= 0) {
            this.setState({elementShiftVertical: 0});
        }
    }

    carouselMoveLeft() {
        this.setState({elementShiftHorizontal: this.state.elementShiftHorizontal + 128});
        if (this.state.elementShiftHorizontal >= 0) {
            this.setState({elementShiftHorizontal: 0});
        }
    }

    carouselMoveRight(length) {
        this.setState({elementShiftHorizontal: this.state.elementShiftHorizontal - 128});
        if (this.state.elementShiftHorizontal <= -length) {
            this.setState({elementShiftHorizontal: 0});
        }
    }

    getVerticalCarousel(componentRender, lengthArrayData, style) {
        const ComponentRender = componentRender;
        let countIDElement = 0;
        return (
            <div>
                <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                    <div style={style} className="carousel_vertical_line">

                        {
                            Object.keys(this.props.source).map((objectData) =>
                            {

                                return <ComponentRender value={this.props.source[objectData]}
                                                        id={countIDElement++}
                                                        key={countIDElement}/>
                            })
                        }

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

    getHorizontalCarousel(componentRender, lengthArrayData, style) {
        const ComponentRender = componentRender;
        let countIDElement = 0;
        return (
            <div className="carousel_horizontal">
                <div className=" card-body  col-12">
                    <div style={style} className="carousel_horizontal_line">
                        {
                            Object.keys(this.props.source).map((objectData) =>
                            {

                                return <ComponentRender value={this.props.source[objectData]}
                                                        id={countIDElement++}
                                                        key={countIDElement}/>
                            })
                            }
                    </div>
                    {/*return <ComponentRender name={this.props.source[objectData].name} id={this.props.source[objectData].id} key={this.props.source[objectData].id}/>*/}
                </div>
                <div className="carousel-control_position carousel_horizontal card-body  col-12 ">
                    <a className="carousel-control_left left carousel-control" href="#carousel-id" role="button"
                       data-slide="prev">
                        <span className="carousel-control_left_glyphicon_chevron  glyphicon glyphicon-chevron-left"
                              aria-hidden="true" onClick={e => this.carouselMoveLeft()}></span>
                    </a>
                    <a className=" carousel-control_right  right carousel-control" href="#carousel-id" role="button"
                       data-slide="next">
                        <span className="carousel-control_right_glyphicon_chevron glyphicon glyphicon-chevron-right"
                              aria-hidden="true" onClick={e => this.carouselMoveRight(lengthArrayData)}></span>
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const styleVertical = {top: this.state.elementShiftVertical};
        const styleHorizontal = {left: this.state.elementShiftHorizontal};
        //TODO эти данные должен отдавать сервер

        const elementContainerWidth = 300;
        const lengthArrayData = this.props.source.length * elementContainerWidth;
        const ComponentRender = this.props.template;
        const type = this.props.type;
        if (type === "vertical") {
            return this.getVerticalCarousel(ComponentRender, lengthArrayData, styleVertical);
        }
        if (type === "horizontal") {
            return this.getHorizontalCarousel(ComponentRender, lengthArrayData, styleHorizontal);
        }
    }
}



