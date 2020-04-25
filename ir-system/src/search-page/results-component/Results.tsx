import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-bootstrap/Spinner';
import { throws } from "assert";

type ResultsComponentProps = {
    query: string
};
type ResultsComponentState = {
    results: string[];
    hasMore: boolean;
};
class ResultsComponent extends React.Component<ResultsComponentProps, ResultsComponentState> {
    state: ResultsComponentState = {
        results: ["asdasd", "adasd"],
        hasMore: true
    };

    loadMore = () => {
        this.setState({ ...this.state, results: [...this.state.results, 'dsfsdfssss', 'asdasd'] });
    }

    render() {
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                loader={<Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
            >
                {this.state.results.map((item: string) => <div>{item}</div>)}
            </InfiniteScroll>
        );
    }
}

export default ResultsComponent;