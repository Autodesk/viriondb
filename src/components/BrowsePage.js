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

    //todo - compute these when filters change
    //todo - these fields should be in constants/filters or something
    const derivedData = ['derived_baltimore'].reduce((acc, field) => {
      const type = filters[field].type;
      if (type === 'discrete') {
        //todo - much more efficient
        const derived = _.groupBy(instances, field).mapValues(array => array.length);
        return acc[field] = derived; 
      }
      //dont handle other types yet
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
