import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SearchPage from './search-page/SearchPage';
import MapComponent from './map-component/MapComponent.js';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/map">
          <MapComponent />
        </Route>
        <Route path="/">
          <SearchPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
