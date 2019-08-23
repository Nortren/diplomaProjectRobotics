import React, {Component, PureComponent} from "react";
import ElementsSliderVertical from '../ElementsCarouselVertical/ElementsCarouselVertical'
class VisualParams extends Component {

    render(){
        return(
            <div className="col-lg-4 col-12 card container m-1 p-0">
                <div className="card-header">
                    Список параметров
                </div>
               <ElementsSliderVertical/>
            </div>
        );
    }

}
export default VisualParams