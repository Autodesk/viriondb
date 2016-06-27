import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import App from '../components/App';
import ComparePage from '../components/ComparePage';
import BrowsePage from '../components/BrowsePage';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path=":instances" component={ComparePage}/>
      <IndexRoute component={BrowsePage} />
    </Route>
  </Router>
);
