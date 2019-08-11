import React, {Component, PureComponent} from "react";

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
                <ul className="row   card-body ">

                    <li className=" card card-body">testdata</li>
                    <li className=" card card-body">testdata</li>
                    <li className=" card card-body">testdata</li>
                    <li className=" card card-body">testdata</li>
                    <li className=" card card-body">testdata</li>
                    <li className=" card card-body">testdata</li>
                    <li className=" card card-body">testdata</li>


                </ul>
            </div>
        );
    }

}
export default VisualDisplay