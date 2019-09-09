import React, {Component} from "react";
import VisualDisplay from './VisualDisplay/VisualDisplay';
// import openSocket  from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.css'
//Почитать
//https://habr.com/ru/company/ruvds/blog/333618/
import '../styles/App.css';
import VisualParams from "./VisualParams/VisualParams";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8010');




function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };

class App extends Component {


    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
    }
    state = {
        customers: [],
        timestamp: 'no timestamp yet'
    };

    componentDidMount() {



        // io.connect('connection',()=>{
        //     console.log('connect',data);
        // });
// const socket = io();


        // io.on('connection', (data)=>{
        //    console.log('connect',data);
        // });


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