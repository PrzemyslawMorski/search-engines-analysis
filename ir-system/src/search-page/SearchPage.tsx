import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

type MyProps = {
};
type MyState = {
};
class SearchPage extends React.Component<MyProps, MyState> {
    state: MyState = {
    };
    render() {
        return (
            <Container>
                <Row>
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
                <Row>
                    <Col>
                        <Row>
                            <h2>Search page</h2>
                        </Row>
                        <Row>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default SearchPage;