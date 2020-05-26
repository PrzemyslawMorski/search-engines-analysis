import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapComponent from "./components/map-component/MapComponent";
import MainPage from "./pages/main-page/MainPage";
import ResultsPage from "./pages/results-page/ResultsPage";
import ArticlePage from './pages/article-page/ArticlePage';
import LocationPage from './pages/location-page/LocationPage';
import OrganisationPage from './pages/organisation-page/OrganisationPage';
import PersonPage from './pages/person-page/PersonPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/search" component={ResultsPage} />
                <Route path="/article/:id" component={ArticlePage} />
                <Route path="/location/:id" component={LocationPage} />
                <Route path="/organisation/:id" component={OrganisationPage} />
                <Route path="/person/:id" component={PersonPage} />
                <Route path="/map" component={MapComponent} />
                <Route path="/" exact={true} component={MainPage} />
            </Switch>
        </Router>
    );
};

export default App;
