import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MapComponent from "./components/map-component/MapComponent";
import MainPage from "./pages/main-page/MainPage";
import ResultsPage from "./pages/results-page/ResultsPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/search" component={ResultsPage}/>
                <Route path="/map" component={MapComponent}/>
                <Route path="/" component={MainPage}/>
            </Switch>
        </Router>
    );
};

export default App;
