import React, { Component } from "react";
import ArticleList from './ArticleList/ArticleList'
import  articles from '../fixtures'
import VisualDisplay from './VisualDisplay/VisualDisplay'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/index.css'

import '../styles/App.css';

class App extends Component {
state={
    reverted:false
};


    render() {
        // return (
        //
        //     <div className="container">
        //         <div className="jumbotron">
        //         <h1 className="display-3">My React App!
        //         <button className="btn" onClick={this.revert}>Revert</button>
        //         </h1>
        //         </div>
        //         <VisualDisplay/>
        //         {/*<ArticleList articles={this.state.reverted ? articles.slice().reverse() : articles}/>*/}
        //     </div>
        // );
        const border = {border: '1px solid black'};
        return(
            <div className="container-fluid ">
                <div className="row jumbotron ">
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
                    <div className="col-4  ">
                        <div className="card-header">
                            Список параметров
                        </div>
                        <ul className="sensorsList list-group list-group-flush ">
                            <li className="list-group-item ">testElement</li>
                            <li className="list-group-item">testElement</li>
                            <li className="list-group-item">testElement</li>
                            <li className="list-group-item">testElement</li>
                            <li className="list-group-item">testElement</li>
                            <li className="list-group-item">testElement</li>
                            <li className="list-group-item">testElement</li>
                            <li className="list-group-item">testElement</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    revert =()=> this.setState({
        reverted:!this.state.reverted
    });

}

export default App;