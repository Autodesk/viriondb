import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import invariant from 'invariant';

import registry, { onRegister } from '../data/register';
import { maxSections, filters } from '../constants/filters';

import RefinePanel from './RefinePanel';
import BrowseTable from './BrowseTable';
import BrowseCharts from './BrowseCharts';

import '../styles/BrowsePage.css';

export class BrowsePage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  constructor() {
    super();
    this.shouldUpdate = true;
    this.listener = onRegister((function browsePageRegister(register, length) {
      if (length > 0) this.forceUpdate();
    }).bind(this));
  }

  state = {
    //filters: filters.reduce((acc, filter) => Object.assign(acc, { [filter.field]: _.cloneDeep(filter.default) }), {}),
    filters: {},
  };

  shouldComponentUpdate() {
    return this.shouldUpdate;
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.shouldUpdate = true;
    }, 15);
  }

  setFilter = (filterPatch) => {
    const nextFilter = Object.assign({}, this.state.filters, filterPatch);

    //remove nulls from filters
    Object.keys(nextFilter).forEach(key => {
      if (nextFilter[key] === null) {
        delete nextFilter[key];
      }
    });

    this.setState({ filters: nextFilter });
  };

  openInstances = (...ids) => {
    this.props.router.push(`/${ids.join(',')}`);
  };

  createFilter(filter) {
    //use hasOwnProperty
    const field = filter.field;

    if (filter.type === 'discrete') {
      return (instance) => this.state.filters[field].hasOwnProperty(instance[field]);
    }

    if (filter.type === 'range') {
      return (instance) => (this.state.filters[field][0] <= instance[field] && this.state.filters[field][1] >= instance[field]);
    }

    console.warn(`no filter for ${filter.field} (${filter.type})`);
    return null;
  }

  createFilters() {
    //may want to put the fastest filters first (key lookups rather than array checks)
    return Object.keys(this.state.filters)
      .map(fieldName => filters.find(cat => cat.field === fieldName))
      .map((filter) => this.createFilter(filter))
      .filter(func => typeof func === 'function');
  }

  render() {
    //tracking so we dont update too often
    this.shouldUpdate = false;

    /* filtering */

    const start = performance.now();

    const filterFunc = instance => _.every(this.createFilters(), filter => filter(instance));
    const filtered = _.filter(_.values(registry), filterFunc);
    const filteredIds = filtered.map(item => item.id);

    /* derived data */

    //may want to compute alongside filtering so only pass through once
    //todo - only go through data once, and compute each field as needed

    //set it up
    const derivedData = filters.reduce((acc, filter) => {
      if (filter.type === 'discrete') {
        const valuesCount = Object.keys(filter.values).reduce((acc, section) => Object.assign(acc, { [section]: 0 }), {});
        return Object.assign(acc, { [filter.field]: valuesCount });
      }

      if (filter.type === 'range') {
        //do we want the pie chart to have sections based on the current range, or sections fixed based on total range
        const [ min, max ] = filter.range;
        const range = max - min;
        const sectionsCount = _.range(maxSections).reduce((acc, section) => Object.assign(acc, { [section]: 0 }), {});

        return Object.assign(acc, { [filter.field]: sectionsCount });
      }

      invariant(false, 'unknown filter type');
      return acc;
    }, {});

    console.log(JSON.stringify(derivedData));

    //go through instances and count derivedData
    filters.forEach(filter => {
      const { type, field } = filter;

      if (type === 'discrete') {
        _.forEach(filtered, instance => {
          derivedData[field][instance[filter.field]] += 1;
        });
      } else if (type === 'range') {
        const [ min, max ] = filter.range;
        const range = max - min;
        _.forEach(filtered, instance => {
          derivedData[field][Math.floor((instance[field] / max) * maxSections)] += 1;
        });
      }
    });

    //todo - may want to process e.g. discrete ones to give percentages (or do this in charts)


    /* old way
    console.log(filters.reduce((acc, cat) => {
      if (cat.type === 'discrete') {
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
    }, {}));
    */

    console.log(performance.now() - start);

    return (
      <div className="BrowsePage">
        <RefinePanel setFilter={this.setFilter}
                     filters={this.state.filters}/>

        <div className="BrowsePage-main">
          <BrowseTable openInstances={this.openInstances.bind(this)}
                       instances={filteredIds}/>

          <BrowseCharts instances={filteredIds}
                        derivedData={derivedData}/>
        </div>
      </div>
    );
  }
}

export default withRouter(BrowsePage);
