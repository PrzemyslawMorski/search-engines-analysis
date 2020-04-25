import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SearchPage from './search-page/SearchPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <SearchPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
