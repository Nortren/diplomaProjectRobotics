import React, {Component, PureComponent} from "react";
import Article from '../Article'
import './ArticleList.css'

export default class ArticleList extends PureComponent {
    state = {
        openArticleId: null,

    }

    render() {
        const articlesElement = this.props.articles.map((article, index) =>
            <li key={article.id} className="article_list__li">
                <Article article={article}
                         isOpen={this.state.openArticleId === article.id}
                         onButtonClick={this.handleClick.bind(this, article.id)}
                />
            </li>
        )
        return (
            <ul>
                {articlesElement}
            </ul>
        )
    }

    handleClick = openArticleId => this.setState({
        openArticleId: this.state.openArticleId === openArticleId ? null : openArticleId
    })

}