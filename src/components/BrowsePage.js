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

    //todo - compute these when filters change, not on every render
    const derivedData = filters.reduce((acc, cat) => {
      if (cat.type === 'discrete') {
        //todo - much more efficient, but still give percentages
        const derived = _.mapValues(_.groupBy(instances, cat.field), array => Math.floor(array.length / instances.length * 100));
        acc[cat.field] = derived; 
      } else if (cat.type === 'range') {
        //todo
        const breakdown = [];
        acc[cat.field] = breakdown;
      } else {
        //uh oh
      }
      return acc;
    }, {});

    return (
      <div className="BrowsePage">
        <RefinePanel setFilter={this.setFilter}
                     filters={this.state.filters}/>

        <div className="BrowsePage-main">
          <BrowseTable openInstances={this.openInstances.bind(this)}
                       instances={filtered}/>

          <BrowseCharts instances={filtered}
                        derivedData={derivedData} />
        </div>
      </div>
    );
  }
}

export default withRouter(BrowsePage);
