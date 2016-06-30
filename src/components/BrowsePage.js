import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import instanceMap from '../../data/testSet';
import { filters } from '../constants/filters';

import RefinePanel from './RefinePanel';
import BrowseTable from './BrowseTable';
import BrowseCharts from './BrowseCharts';

import '../styles/BrowsePage.css';

export class BrowsePage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  //todo - only include filters we need? or filter very efficiently
  state = {
    filters: filters.reduce((acc, filter) => Object.assign(acc, { [filter.field]: filter.default }), {}),
  };

  setFilter = (filter) => {
    this.setState({ filters: Object.assign({}, this.state.filters, filter) });
  };

  openInstances = (...ids) => {
    this.props.router.push(`/${ids.join(',')}`);
  };

  render() {
    const instances = _.values(instanceMap);

    //todo - set up filter (using lodash?) - should be in a shared place
    const filtered = instances;

    return (
      <div className="BrowsePage">
        <RefinePanel setFilter={this.setFilter}
                     filters={this.state.filters}/>

        <div className="BrowsePage-main">
          <BrowseTable openInstances={this.openInstances.bind(this)}
                       instances={filtered}/>
          <BrowseCharts />
        </div>
      </div>
    );
  }
}

export default withRouter(BrowsePage);
