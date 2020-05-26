import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Col, Container, Row } from "react-bootstrap";
import logo from '../../assets/logo.png'
import {Link, useHistory} from "react-router-dom";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchService from "../../services/Search.service";
import { Article } from "../../models/Article";
import loaderGif from '../../assets/loader.gif'
import ResultItem from "../results-page/ResultItem";
import _ from "lodash";

const OrganisationPage = (props: any) => {

    const history = useHistory();

    function searchedCallback(query: string) {
        history.push("/search?q=" + query)
    }
    
    const [query, setQuery] = useState<string>(props.match.params.name);
    const [results, setResults] = useState<Article[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [count, setCount] = useState(0);
    const [activeFrom, setActiveFrom] = useState("Loading...");

    const searchService: SearchService = new SearchService();

    const queryBuilder = { 
        "bool": { 
          "must": [
            { "match": { "organization": props.match.params.name}}
          ],
        }
    };

    const sortBuilder = {"published":"asc"}
    searchService.getCount({query: queryBuilder})
                .then(count => {
                    console.log("setting count as: ", count);
                    setCount(count)
                });

    searchService.customQueryArticles(queryBuilder, [{"published":"asc"}])
                .then(articles => {
                    const oldestDate=articles[0]._source.published
                    console.log("getting oldest articles: ", oldestDate);
                    setActiveFrom(new Date(oldestDate).toLocaleDateString())
                });

    useEffect(() => {
        console.log("usingEffect")
        searchService.customQueryArticles(queryBuilder).then(articles => {
            setResults(articles)
        }).catch(err => console.log("logging error: usingEffect", err))

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    let loadMore = () => {
        console.log("loading more")
        searchService.customQueryArticles(queryBuilder, null, _.last(results)).then(articles => {
            setHasMore(!!articles && articles.length !== 0)
            setResults(prevState => [...prevState, ...articles])
        }).catch(err => console.log("logging error loading more: ", err))
    };

    return (
            <Container>
                <Row>
                    <Col className={"d-flex"}>
                        <Link to={'/'}><img src={logo} alt="logo" className="d-flex search-logo"/></Link>
                        <div className={"flex-grow-1"}>
                        <SearchBar searched={searchedCallback}/>
                        </div>
                    </Col>
                </Row>
                <Row className="detail-header d-flex align-items-center" >
                    <Col xs={8}>
                        <h2>{props.match.params.name}</h2>
                        <div style={{marginTop: "30px"}}>
                            <div className="header-info">No. Articles:</div> {count}
                            <div className="header-info">First article date:</div> {activeFrom}
                        </div>
                    </Col>
                    <Col xs={4}>
                    <Link to={'/'}><img src={logo} alt="logo" className="d-flex"/></Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            loader={<img src={loaderGif} className="loader" alt="Loading..."/>}>
                            {results.map((item, index) =>
                                <ResultItem key={index} article={item}/>)
                            }
                        </InfiniteScroll>
                    </Col>
                </Row>
            </Container>
    )
}
export default OrganisationPage;