import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ResultsComponent from "./results-component/Results";

type SearchPageProps = {
};
type SearchPageState = {
    searched: boolean;
    searchInput: string;
    currentQuery: string;
};
class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
    state: SearchPageState = {
        searched: false,
        searchInput: '',
        currentQuery: ''
    };

    constructor(props: SearchPageProps) {
        super(props);

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.onSearchInputKeyUp = this.onSearchInputKeyUp.bind(this);
    }

    onSearchInputKeyUp(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            this.setState({ ...this.state, searched: true, currentQuery: this.state.searchInput });
        }

    }
    handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchInput: event.target.value });
    }

    render() {
        return (
            <Container>
                {
                    this.state.searched ? null : <Row>
                        <Col>
                            <Jumbotron>
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
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="search-input">Search</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Input your search phrase and press Enter"
                                    type="input"
                                    aria-label="Search"
                                    aria-describedby="search-input"
                                    value={this.state.searchInput}
                                    onChange={this.handleQueryChange}
                                    onKeyUp={this.onSearchInputKeyUp}
                                />
                            </InputGroup>
                        </Row>
                        {this.state.searched ? <Row>
                            <ResultsComponent query={this.state.currentQuery} />
                        </Row> : null}
                    </Col>

                </Row >
            </Container >
        );
    }
}

export default SearchPage;