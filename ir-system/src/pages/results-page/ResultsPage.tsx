import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import loaderGif from '../../assets/loader.gif'
import InfiniteScroll from "react-infinite-scroller";
import ResultItem from "./ResultItem";
import SearchService from "../../services/Search.service";
import {useHistory} from "react-router";
import queryString from 'query-string'
import {Article} from "../../models/Article";
import _ from "lodash";
import SearchBar from "../../components/search-bar/SearchBar";
import FiltersBar, {Filters} from "./components/FiltersBar";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import MapComponent from "../../components/map-component/MapComponent";

const ResultsPage = () => {

    const history = useHistory();
    const params = queryString.parse(history.location.search);

    const [query, setQuery] = useState<string>(typeof params.q === "string" ? params.q : '');
    const [results, setResults] = useState<Article[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const searchService: SearchService = new SearchService();

    useEffect(() => {

        searchService.loadArticles(query).then(articles => {
            setResults(articles)
        })

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const loadMore = () => {
        searchService.loadArticles(query, _.last(results)).then(articles => {
            setHasMore(!!articles && articles.length !== 0)
            setResults(prevState => [...prevState, ...articles])
        })
    };

    function onQueryChanged(newQuery: string) {
        history.push('/search?q=' + newQuery)
        setQuery(newQuery)
    }

    function onFiltersChange(filters: Filters) {
        // console.log("Filters changed!")
        // console.log(filters)
    }

    return (
        <Container fluid>
            <Row className={"mt-2 justify-content-sm-center"}>
                <Col className={"d-flex"}>
                    <Link to={'/'}><img src={logo} alt="logo" className="d-flex search-logo"/></Link>
                    <div className={"flex-grow-1"}>
                    <SearchBar initialSearchInput={query} searched={onQueryChanged}/>
                    </div>
                </Col>
            </Row>
            <Row className={"mt-2 pb-2 justify-content-sm-between"} style={{borderBottom: "1px solid blue"}}>
                <Col sm={10}>
                    <FiltersBar query={query} onFiltersChange={onFiltersChange}/>
                </Col>
            </Row>
            <Row className={"mt-2 justify-content-sm-center"}>

                <Col sm={10}>
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
                <Col sm={2} className="mentions-map-miniature-section">
                    Mentions Map
                    <Link to={'/map'}>
                        <div className="mentions-map-miniature-container">
                            <MapComponent miniature />
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}
export default ResultsPage;