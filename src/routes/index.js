import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import App from '../components/App';
import Instance from '../components/Instance';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path=":instanceId" component={Instance}/>
    </Route>
  </Router>
);
