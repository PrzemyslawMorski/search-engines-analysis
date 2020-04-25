import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-bootstrap/Spinner';
import SearchService from "../Search.service";
import { Article } from "../../models/Article";
import _ from "lodash";

type ResultsComponentProps = {
    query: string
};
type ResultsComponentState = {
    results: Article[];
    hasMore: boolean;
};
class ResultsComponent extends React.Component<ResultsComponentProps, ResultsComponentState> {
    state: ResultsComponentState = {
        results: [],
        hasMore: true
    };

    searchService: SearchService = new SearchService();

    loadMore = async () => {
        if (!this.state.hasMore) {
            return;
        }

        const articles = await this.searchService.loadArticles(this.props.query, _.last(this.state.results))
        if (!articles || articles.length === 0) {
            this.setState({ ...this.state, hasMore: false });
        } else {
            this.setState({ ...this.state, results: _.concat(this.state.results, ...articles) });
        }
    }

    render() {
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                loader={<Spinner key={0} animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
            >
                {this.state.results.map((item: Article) => <div key={item._source.uuid}>{item._source.title}</div>)}
            </InfiniteScroll>
        );
    }
}

export default ResultsComponent;