import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import logo from '../../assets/logo.png'
import {Link, useHistory} from "react-router-dom";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchService from "../../services/Search.service";
import { Article } from "../../models/Article";
import _ from "lodash";

const ArticlePage = (props: any) => {

    const history = useHistory();

    function searchedCallback(query: string) {
        history.push("/search?q=" + query)
    }
    
    const [articleData, setArticleData] = useState({
        text:"",
        title: "",
        published: "",
        author: "",
        organizations: [""],
        people: [""],
        locations: "",
        url: ""
    });
    const searchService: SearchService = new SearchService();
    const queryBuilder = { 
        "bool": { 
          "must": [
            { "match": { "_id": props.match.params.id}}
          ],
        }
    };
    
    useEffect(() => {
        searchService.customQueryArticles(queryBuilder)
        .then((articles:Article[]) => {
            console.log("got articles: ", articles)
            if(articles[0]){
                const article = articles[0]._source
                console.log(article)
                setArticleData(
                    {text:article.text,
                    title:article.title,
                    published:new Date(article.published).toLocaleDateString(),
                    author: article.author,
                    organizations: article.entities.organizations.map(e=>e.name),
                    people: article.entities.persons.map(e=>e.name),
                    locations: article.locations.join(", "),
                    url: article.url}
                )
            }
        });
    },[]);

    return (
            <Container>
                <Row>
                    <Col sm={"auto"} className={"mt-2"}>
                        <Button size="sm" variant="outline-dark" onClick={() => history.goBack()}>Back</Button>
                    </Col>
                    <Col className={"d-flex"}>
                        <Link to={'/'}><img src={logo} alt="logo" className="d-flex search-logo"/></Link>
                        <div className={"flex-grow-1"}>
                        <SearchBar searched={searchedCallback}/>
                        </div>
                    </Col>
                </Row>
                <Row className="detail-header d-flex align-items-center" >
                    <Col xs={8}>
                        <h3>{articleData.title}</h3>
                    </Col>
                    <Col xs={4}>
                    <Link to={'/'}><img src={logo} alt="logo" className="d-flex"/></Link>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={9}>
                        {articleData.text}
                    </Col>
                    <Col xs={3}>
                        <h3>Info</h3>
                            <h6><a href={articleData.url}>URL</a></h6>
                            <h4>Date</h4>
                            {articleData.published}
                            {articleData.author && <span><h4>Author</h4>
                            <Link to={'/person/'+articleData.author.replace(" ", "-")}>{articleData.author}</Link></span>}
                            
                            {articleData.organizations.length >0 && <span><h4>Organizations</h4>
                            {articleData.organizations.map(organization =><h6><Link to={'/organisation/' + organization.replace(" ","-")}>{organization}</Link></h6>)}</span>}
                        
                        {articleData.people.length>0 || articleData.locations && <h3>Related</h3>}
                            {articleData.people.length>0 && <span><h4>People</h4>
                            {articleData.people.map(peopl =><h6><Link to={'/person/' + peopl.replace(" ","-")+"/?nonAuthor=true"}>{peopl}</Link></h6>)}</span>}
                            
                            {articleData.locations && <span><h4>Locations</h4>
                            {articleData.locations}</span>}
                    </Col>
                </Row>
            </Container>
    )
}
export default ArticlePage;