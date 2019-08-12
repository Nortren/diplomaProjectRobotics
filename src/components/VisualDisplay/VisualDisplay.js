import React, {Component, PureComponent} from "react";
import MyElementsSlider from "../MyElementsSlider/MyElementsSlider";
class VisualDisplay extends Component {

    render(){
        return(
            <div className=" col-8 card  ">
                <div className="row  card-body ">
                    <div className="dataVisualisation card col-6" >
                        realTimeVideoTranslation
                    </div>

                    <div className="dataVisualisation card col-6" >
                        realTimeVideoTranslation
                    </div>
                </div>
                <div className=' card-body'>
         <MyElementsSlider/>
					 </div>
            </div>
        );
    }

}
export default VisualDisplay