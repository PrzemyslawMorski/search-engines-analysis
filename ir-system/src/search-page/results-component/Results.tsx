import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import SearchService from "../Search.service";
import { Article } from "../../models/Article";
import _ from "lodash";
import { Observable, Subscription, from, Subject } from "rxjs";
import { mergeMap, withLatestFrom } from "rxjs/operators";
import loader from "../../loader.gif";

type ResultsComponentProps = {
    query$: Observable<string>
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

    subscriptions: Subscription[] = [];
    searchService: SearchService = new SearchService();
    loadMoreEvent = new Subject();

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    componentDidMount() {
        this.subscriptions.push(this.props.query$.subscribe(() => this.setState({ ...this.state, results: [], hasMore: true })));

        this.subscriptions.push(this.loadMoreEvent.pipe(
            withLatestFrom(this.props.query$),
            mergeMap(([, lastSearchPhrase]) => from(this.searchService.loadArticles(lastSearchPhrase, _.last(this.state.results))))
        )
            .subscribe(articles => {
                if (!articles || articles.length === 0) {
                    this.setState({ ...this.state, hasMore: false });
                } else {
                    this.setState({ ...this.state, results: _.concat(this.state.results, ...articles) });
                }
            }));
    }

    loadMore = () => {
        this.loadMoreEvent.next();
    }

    render() {
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                loader={<img src={loader} className="loader" alt="Loading..." />}
            >
                {this.state.results.map((item: Article) => <div key={item._source.uuid}>{item._source.title}</div>)}
            </InfiniteScroll>
        );
    }
}

export default ResultsComponent;