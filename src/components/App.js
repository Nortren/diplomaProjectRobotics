import React, {Component} from "react";
import VisualDisplay from './VisualDisplay/VisualDisplay'

import 'bootstrap/dist/css/bootstrap.css'


import '../styles/App.css';
import VisualParams from "./VisualParams/VisualParams";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
class App extends Component {
    state = {
        customers: []
    };

    componentDidMount() {
    fetch(
        'http://localhost:3000/api/customers', {

    }, {

    })
        .then(res => res.json())
        .then(customers => this.setState({customers: customers},()=>console.log('Customers fetched ' + customers.id)));
    }

    render() {
        const border = {border: '1px solid black'};
        return (
            <div className="container-fluid ">
                <div className="row jumbotron p-2">
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