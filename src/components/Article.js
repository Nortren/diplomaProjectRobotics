import React, {Component, PureComponent} from "react";
class Article extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.isOpen !== nextState.isOpen
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.defaultOpen !== this.props.defaultOpen) {
    //         this.setState({
    //             isOpen: nextProps.defaultOpen
    //         });
    //     }
    // }

    componentWillUpdate() {
        console.log('componentWillUpdate');
    }

    render() {
        const {article,isOpen,onButtonClick} = this.props;
        const body = isOpen && <section className="card-text">{article.text}</section>,
            title = <div>{article.title}</div>,
            date = <div>{new Date(article.date).toDateString()}</div>,
            style = {width: '50%'};
        return (
            <div className="card mx-auto" style={style}>
                <div className="card-header">
                    <h2 onClick={this.incrementCounter}>
                        {title}
                        clicked {this.state.count}
                        <button onClick={onButtonClick}
                                className="btn btn-primary btn-lg float-right">{isOpen ? 'close' : 'open'}</button>
                    </h2>
                </div>
                <div className="card-body text-muted">
                    <h6 className="card-subtitle">
                        {date}
                    </h6>
                    {body}
                </div>
            </div>
        )
    }
    incrementCounter=()=>{
        this.setState({
            count: this.state.count+1
        })
    };

}

export default Article