import React, {Component, PureComponent} from "react";
import ElementsCarouselVertical from '../ElementsCarouselVertical/ElementsCarouselVertical'
class VisualParams extends Component {

    render(){
        const graphsDataArray = [{
            id: 1,
            name: 'Давление',
            // value: this.state.maxValueGraphs_1
        }, {
            id: 2,
            name: 'Температура',
            // value: this.state.maxValueGraphs_2
        },
            {
                id: 3,
                name: 'Радиационный фон',
                // value: this.state.maxValueGraphs_3
            }, {
                id: 4,
                name: 'Концентрация вредных веществ',
                // value: this.state.maxValueGraphs_4
            }];


        return(
            <div className="col-lg-3 col-md-12 col-12 container  p-4 VisualParams">
                <div className="card-header">
                    Список параметров
                </div>
               <ElementsCarouselVertical source={graphsDataArray}/>
            </div>
        );
    }

}
export default VisualParams