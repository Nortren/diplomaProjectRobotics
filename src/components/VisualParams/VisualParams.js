import React, {Component, PureComponent} from "react";
import ElementsSliderVertical from '../ElementsCarouselVertical/ElementsCarouselVertical'
class VisualParams extends Component {

    render(){
        return(
            <div className="col-lg-3 col-md-12 col-12 container  p-4 VisualParams">
                <div className="card-header">
                    Список параметров
                </div>
               <ElementsSliderVertical/>
            </div>
        );
    }

}
export default VisualParams