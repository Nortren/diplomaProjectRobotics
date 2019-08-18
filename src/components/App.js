import React, {Component} from "react";
import VisualDisplay from './VisualDisplay/VisualDisplay'

import 'bootstrap/dist/css/bootstrap.css'


import '../styles/App.css';
import VisualParams from "./VisualParams/VisualParams";

class App extends Component {
    state = {
        reverted: false
    };


    render() {
        const border = {border: '1px solid black'};
        return (
            <div className="container-fluid w-100">
                <div className="row jumbotron ">
                    <VisualDisplay/>
                    <VisualParams/>
                </div>
            </div>
        )
    }

    revert = () => this.setState({
        reverted: !this.state.reverted
    });

}

export default App;