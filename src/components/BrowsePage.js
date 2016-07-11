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
    filters: filters.reduce((acc, filter) => Object.assign(acc, { [filter.field]: _.cloneDeep(filter.default) }), {}),
  };

  setFilter = (filterPatch) => {
    this.setState({ filters: Object.assign({}, this.state.filters, filterPatch) });
  };

  openInstances = (...ids) => {
    this.props.router.push(`/${ids.join(',')}`);
  };

  render() {
    const instances = _.values(instanceMap);

    const createFilter = (cat) => {
      if (cat.type === 'discrete') {
        return (instance) => Object.keys(this.state.filters[cat.field]).length === 0 || this.state.filters[cat.field][instance[cat.field]];
      } else if (cat.type === 'range') {
        return (instance) => _.isEqual(this.state.filters[cat.field], cat.default) || (this.state.filters[cat.field][0] <= instance[cat.field] && this.state.filters[cat.field][1] >= instance[cat.field]);
      } else {
        console.warn(`no filter for ${cat.field} (${cat.type})`);
        return () => true;
      }
    };

    //filter the instances
    //todo - performance
    //debugger;
    const currentFilters = Object.keys(this.state.filters).map(filterName => filters.find(cat => cat.field === filterName));
    console.log(currentFilters);
    const filterGauntlet = currentFilters.map(createFilter);
    const filterFunc = instance => _.every(filterGauntlet, filter => filter(instance));
    const filtered = _.filter(instances, filterFunc);

    //todo - compute these when filters change, not on every render
    const derivedData = filters.reduce((acc, cat) => {
      if (cat.type === 'discrete') {
        //todo - more efficient, but still give percentages
        const derived = _.mapValues(_.groupBy(filtered, cat.field), array => Math.floor(array.length / filtered.length * 100));
        acc[cat.field] = derived;
      } else if (cat.type === 'range') {
        const maximum = cat.range[1];
        const range = maximum - cat.range[0];
        const maxCategories = 10;
        let breakdown;
        if (range > maxCategories) {
          //if the range is very large, we need to group it so its looks nicer?
          //or do this in d3?
          //need to pass labels or make them deterministic
          const counter = (instance) => Math.floor(instance[cat.field] / maximum * maxCategories);
          breakdown = _.countBy(filtered, counter);
        } else {
          breakdown = _.groupBy(filtered, cat.field);
        }
        acc[cat.field] = breakdown;
      } else {
        //Bar chart?
        //const breakdown = _.groupBy(instances, cat.field)

        //or else...
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
