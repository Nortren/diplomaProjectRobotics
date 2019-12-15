import React, {Component, PureComponent} from "react";
import ElementsCarouselHorizontal from "../ElementsCarouselHorizontal/ElementsCarouselHorizontal";
import ElementsCarousel from "../ElementsCarousel/ElementsCarousel";
import Dashboard from "../Dashboard/Dashboard";
import Graph from "../Graph/Graph";
import VideoTranslation from "../VideoTranslation/VideoTranslation";
import MapDisplay from "../MapDisplay/MapDisplay";

class VisualDisplay extends Component {

    render() {
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

        return (
            <div className=" col-xl-8 col-md-12 col-12  container p-4 VisualDisplay">
                <div className="row  card-body ">
                    <VideoTranslation />
                   <MapDisplay/>
                </div>
                <div className=' card-body VisualDisplay-Dashboard'>
                    <ElementsCarousel source={graphsDataArray} template={Graph} type="horizontal"/>
                    {/*<ElementsCarouselHorizontal/>*/}
                </div>
            </div>
        );
    }

}
export default VisualDisplay
