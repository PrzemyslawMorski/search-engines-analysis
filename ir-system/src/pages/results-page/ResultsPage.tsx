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

    let loadMore = () => {
        searchService.loadArticles(query, _.last(results)).then(articles => {
            setHasMore(!!articles && articles.length !== 0)
            setResults(prevState => [...prevState, ...articles])
        })
    };

    function onQueryChanged(newQuery: string) {
        history.push('/search?q=' + newQuery)
        setQuery(newQuery)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <SearchBar initialSearchInput={query} searched={onQueryChanged}/>
                    </Row>
                </Col>
            </Row>
            <Row>
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
                <Col sm={2}>
                    mentions map
                </Col>
            </Row>
        </Container>
    )
}
export default ResultsPage;