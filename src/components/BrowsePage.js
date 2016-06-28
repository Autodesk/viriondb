import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import instanceMap from '../../data/testSet';

import RefinePanel from './RefinePanel';
import BrowseTable from './BrowseTable';
import BrowseCharts from './BrowseCharts';

import '../styles/BrowsePage.css';

export default class BrowsePage extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    filters: {
      derived_baltimore: ['2'],
    },
  };

  setFilter = (filter) => {
    this.setState({ filters: Object.assign({}, this.state.filters, filter) });
  };

  compareInstances = (...ids) => {
    //todo
    debugger;
    this.context.router.push(`/${ids.join(',')}`);
  };

  render() {
    const instances = _.values(instanceMap);

    //todo
    const filtered = instances.slice(0, 10);

    return (
      <div className="BrowsePage">
        <RefinePanel setFilter={this.setFilter}
                     filters={this.state.filters}/>

        <div className="BrowsePage-main">
          <BrowseTable compareInstances={this.compareInstances}
                       instances={filtered}/>
          <BrowseCharts />
        </div>
      </div>
    );
  }
};
