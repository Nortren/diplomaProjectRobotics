import * as React from 'react';

//TODO доделать горизонтальный и переключение опциями
/**
 * Универсальный компонент слайдера(вертикальный/горизонтальный)
 */

export default class ElementsCarousel extends React.Component {
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
    getVerticalCarousel(componentRender,lengthArrayData,style){
        const ComponentRender = componentRender;
        return (
            <div>
                <div className="carousel_vertical card-body card col-12 sensorsList  list-group-flush">
                    <div style={style} className="carousel_vertical_line">

                        {this.props.source.map( (object) => {
                            return <ComponentRender name={object.name} id={object.id} key={object.id}/>
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
    getHorizontalCarousel(componentRender,lengthArrayData,style){
        const ComponentRender = componentRender;
        return (
            <div className="carousel_horizontal">
                <div  className=" card-body  col-12">
                    <div  style={ style } className="carousel_horizontal_line">
                        {this.props.source.map( (object) => {
                            return <ComponentRender name={object.name} id={object.id} key={object.id}/>
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
    render() {
        const style = {top: this.state.elementShift};
        //TODO эти данные должен отдавать сервер

        const elementContainerWidth = 300;
        const lengthArrayData = this.props.source.length * elementContainerWidth;
        const ComponentRender = this.props.template;
        const type = this.props.type;
        if(type === "vertical") {
            return this.getVerticalCarousel(ComponentRender, lengthArrayData, style);
        }
        if(type === "horizontal") {
            return this.getHorizontalCarousel(ComponentRender, lengthArrayData, style);
        }
    }
}



