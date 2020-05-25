import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import SearchService from "../Search.service";
import {Article} from "../../models/Article";
import _ from "lodash";
import {from, Observable, Subject, Subscription} from "rxjs";
import {mergeMap, withLatestFrom} from "rxjs/operators";
import loader from "../../loader.gif";
import ResultItem from "./ResultItem"
import {Col, Container, Row} from "react-bootstrap";

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
        this.subscriptions.push(this.props.query$.subscribe(() => this.setState({
            ...this.state,
            results: [],
            hasMore: true
        })));

        this.subscriptions.push(this.loadMoreEvent.pipe(
            withLatestFrom(this.props.query$),
            mergeMap(([, lastSearchPhrase]) => from(this.searchService.loadArticles(lastSearchPhrase, _.last(this.state.results))))
        )
            .subscribe(articles => {
                if (!articles || articles.length === 0) {
                    this.setState({...this.state, hasMore: false});
                } else {
                    this.setState({...this.state, results: _.concat(this.state.results, ...articles)});
                }
            }));
    }

    loadMore = () => {
        this.loadMoreEvent.next();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={10}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore}
                            hasMore={this.state.hasMore}
                            loader={<img src={loader} className="loader" alt="Loading..."/>}>

                            {this.state.results.map((item, index) =>
                                <ResultItem key={index} article={item}/>)
                            }

                        </InfiniteScroll>
                    </Col>
                    <Col sm={2}>
                        mentions map
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default ResultsComponent;