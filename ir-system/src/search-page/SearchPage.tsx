import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultsComponent from "./results-component/Results";
import SearchBar from "./SearchBar";
import { ReplaySubject } from "rxjs";
import { Link } from "react-router-dom";

type SearchPageProps = {
};
type SearchPageState = {
    searched: boolean;
};
class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
    state: SearchPageState = {
        searched: false
    };

    currentQuery$ = new ReplaySubject<string>(1);

    constructor(props: SearchPageProps) {
        super(props);
        this.searchedCallback = this.searchedCallback.bind(this);
    }

    searchedCallback(searchPhrase: string) {
        this.setState({ searched: true });
        this.currentQuery$.next(searchPhrase);
    }

    render() {
        return (
            <Container>
                {
                    this.state.searched ? null : <Row>
                        <Col>
                            <Jumbotron>
                                <Link to="/map">Map</Link>
                                <h1>Hello!</h1>
                                <p>
                                    <span>This web page is used to search through a set of business-related news articles which are part of </span>
                                    <a href="https://www.kaggle.com/jeet2016/us-financial-news-articles">this data set</a>
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row>
                }
                < Row >
                    <Col>
                        <Row className={"mb-10 " + this.state.searched ? "mt-10" : ""}>
                            <h2>Search page</h2>
                        </Row>
                        <Row>
                            <SearchBar searched={this.searchedCallback} />
                        </Row>
                        {this.state.searched ? <Row>
                            <ResultsComponent query$={this.currentQuery$} />
                        </Row> : null}
                    </Col>

                </Row >
            </Container >
        );
    }
}

export default SearchPage;