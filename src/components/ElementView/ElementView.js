import React, {Component, PureComponent} from "react";
import './ElementView.css'
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
class ElementView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elementShift: 0
        };
    }

    render() {
        const style = { top: this.state.elementShift };

        return (
            <div>
            <div className="">

            </div>

        );
    }

}



export default ElementView

