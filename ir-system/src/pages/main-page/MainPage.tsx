import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from "../../components/search-bar/SearchBar";
import {Link, useHistory} from "react-router-dom";

const MainPage = () => {

    const history = useHistory();

    function searchedCallback(query: string) {
        history.push("/search?q=" + query)
    }

    return (
        <Container>

            <Row>
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

            <Row>
                <Col>
                    <Row className={"mb-10 mt-10"}>
                        <h2>Search page</h2>
                    </Row>
                    <Row>
                        <SearchBar searched={searchedCallback}/>
                    </Row>
                </Col>

            </Row>
        </Container>
    );

}

export default MainPage;