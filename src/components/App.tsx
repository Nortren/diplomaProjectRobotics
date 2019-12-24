import * as React from 'react';
import VisualDisplay from './VisualDisplay/VisualDisplay';
// import openSocket  from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.css'
import '../../projectLibrary.css'
//Почитать
//https://habr.com/ru/company/ruvds/blog/333618/
import '../styles/App.css';
import VisualParams from "./VisualParams/VisualParams";


export default class App extends React.Component {


    constructor(props) {
        super(props);
    }

    state = {
        customers: [],
        timestamp: 'no timestamp yet'
    };

    componentDidMount() {
        // fetch(
        //     'http://localhost:3000/api/customers', {}, {})
        //     .then(res => res.json())
        //     .then(customers => this.setState({customers: customers}, () => console.log('Customers fetched ' + customers.id)));
    }

    render() {
        const border = {border: '1px solid black'};
        return (
            <div className="container-fluid MainTheme">

                <div className="row p-2 MainTheme_Menu">

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
