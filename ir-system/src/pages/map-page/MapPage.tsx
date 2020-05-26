import React, {useState} from "react";
import {useHistory} from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import SearchBar from "../../components/search-bar/SearchBar";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import queryString from 'query-string'
import MapComponent from "../../components/map-component/MapComponent";

const MapPage = () => {

    const history = useHistory();
    const params = queryString.parse(history.location.search);

    const [query, setQuery] = useState<string>(typeof params.q === "string" ? params.q : '');

    function onQueryChanged(newQuery: string) {
        history.push('/search?q=' + newQuery)
        setQuery(newQuery)
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
            <Row className={"mt-2 justify-content-sm-center"}>
                <Col sm={8}>
                    <h4>Mentions Map</h4>
                </Col>
            </Row>
            <Row className={"mt-2 justify-content-sm-center"}>
                <Col sm={8}>
                    <div className="mentions-map-container">
                        <MapComponent />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default MapPage;