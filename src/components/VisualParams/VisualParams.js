import React, {Component, PureComponent} from "react";
import ElementsSliderVertical from '../ElementsSliderVertical/ElementsSliderVertical'
class VisualParams extends Component {

    render(){
        return(
            <div className="col-4  ">
                <div className="card-header">
                    Список параметров
                </div>
               <ElementsSliderVertical/>
            </div>
        );
    }

}
export default VisualParams