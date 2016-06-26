import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import App from '../components/App';
import ComparePage from '../components/ComparePage';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path=":instances" component={ComparePage}/>
    </Route>
  </Router>
);
