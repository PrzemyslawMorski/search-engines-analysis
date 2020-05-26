import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { Article } from "../../models/Article";
import { Link } from "react-router-dom";

type ResultItemProps = {
    article: Article
};


const ResultItem = ({ article }: ResultItemProps) => {
    let count = 250;

    return (
        <Container className={"mt-4 mb-4"}>
            <Row className={"mb-1"}>
                <Col><h4><Link to={'/article/' + article._id}>{article._source.title}</Link></h4></Col>
            </Row>
            <Row className={"mb-2"}>
                <Col>{article._source.text.slice(0, count) + (article._source.text.length > count ? "..." : "")}</Col>
            </Row>
            <Row>
            <Col className={"col-sm-auto"}>Author: <Link to={'/person/'+article._source.author.replace(" ", "-")}>{article._source.author}</Link></Col>
                <Col className={"col-sm-auto"}>Date: {new Date(article._source.published).toLocaleString()}</Col>
            </Row>
        </Container>)

}


export default ResultItem;