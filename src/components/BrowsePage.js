import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import invariant from 'invariant';

import registry, { onRegister } from '../data/register';
import activeFilters, { setFilter, onRegisterFilter } from '../data/activeFilters';
import { unknownValue, maxSections, filters } from '../constants/filters';

import RefinePanel from './RefinePanel';
import BrowseTable from './BrowseTable';
import BrowseCharts from './BrowseCharts';
import Spinner from './Spinner';

import '../styles/BrowsePage.css';

export class BrowsePage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    filters: {},
  };

  componentDidMount() {
    this.shouldUpdate = true;

    this.registerListener = onRegister((function browsePageRegister(register, length) {
      if (length > 0) {
        this.forceUpdate();
      }
    }).bind(this));

    this.filterListener = onRegisterFilter((filters, force) => {
      this.setState({ filters });
      if (force) {
        this.shouldUpdate = true;
      }
    });
  }

  shouldComponentUpdate() {
    return this.shouldUpdate;
  }

  componentDidUpdate() {
    performance.mark('page - update done');
    if (process.env.NODE_ENV !== 'production') {
      const marks = performance.getEntriesByType('mark');
      const start = marks[0].startTime;
      marks.forEach((mark) => {
        console.log(mark.name, mark.startTime - start);
      });
    }

    //lame debouncing
    //todo - use real debouncing
    setTimeout(() => {
      this.shouldUpdate = true;
    }, 0);
  }

  componentWillUnmount() {
    this.registerListener();
    this.filterListener();
  }

  openInstances = (...ids) => {
    this.props.router.push(`/${ids.join(',')}`);
  };

  createFilter(filter) {
    const field = filter.field;

    if (filter.type === 'discrete') {
      return function discreteFilter(instance) {
        return activeFilters[field].hasOwnProperty(instance[field]);
      };
    }

    if (filter.type === 'range') {
      return function rangeFilter(instance) {
        return activeFilters[field][0] <= instance[field] && activeFilters[field][1] >= instance[field];
      };
    }

    //this filter is the most expensive
    if (filter.type === 'textFilter') {
      return function textFilter(instance) {
        return activeFilters[field].every(string => instance[field].toLowerCase().indexOf(string.toLowerCase()) >= 0);
      };
    }

    console.warn(`no filter for ${filter.field} (${filter.type})`);
    return null;
  }

  createFilters() {
    return Object.keys(activeFilters)
      .map(fieldName => filters.find(cat => cat.field === fieldName))
      //put key lookups first, and name filter thing last
      .sort((one, two) => one.type === 'textFilter' ? 1 : one.type === 'discrete' ? -1 : 0)
      .map((filter) => this.createFilter(filter))
      .filter(func => typeof func === 'function');
  }

  render() {
    //check in case they came in on the compare page
    if (Object.keys(registry).length < 10) {
      return (
        <div className="BrowsePage">
          <div className="BrowsePage-main" style={{ marginTop: '2rem' }}>
            <Spinner />
          </div>
        </div>
      );
    }

    //tracking so we dont update too often. check componentDidUpdate
    this.shouldUpdate = false;

    /* filtering */

    performance.clearMarks();
    performance.mark('page - renderStart');

    const createdFilters = this.createFilters();
    const filterFunc = createdFilters.length === 0 ?
      () => true :
      instance => _.every(createdFilters, filter => filter(instance));

    performance.mark('page - madeFilters');

    const filtered = _.filter(_.values(registry), filterFunc);
    const filteredIds = filtered.map(item => item.id);

    performance.mark('page - filtered');

    /* derived data */

    //may want to compute alongside filtering so only pass through once

    //set it up
    const derivedData = filters.slice()
      .filter(filter => filter.visible !== false)
      .sort((one, two) => one.type === 'discrete' ? -1 : 1)
      .reduce((acc, filter) => {
        if (filter.type === 'discrete') {
          const valuesCount = Object.keys(filter.values).reduce((acc, section) => Object.assign(acc, { [section]: 0 }), {});
          return Object.assign(acc, { [filter.field]: valuesCount });
        }

        if (filter.type === 'range') {
          //can set up and go through at same time
          Object.assign(acc, { [filter.field]: {} });
          const innerAcc = acc[filter.field];

          _.forEach(filtered, inst => {
            if (!innerAcc.hasOwnProperty(inst[filter.field])) {
              innerAcc[inst[filter.field]] = 0;
            }
            innerAcc[inst[filter.field]] += 1;
          });

          delete innerAcc[unknownValue];

          return acc;

          /*
           //do we want the pie chart to have sections based on the current range, or sections fixed based on total range
           const [ min, max ] = filter.range;
           const range = max - min;
           const sectionsCount = _.range(maxSections).reduce((acc, section) => Object.assign(acc, { [section]: 0 }), {});
           return Object.assign(acc, { [filter.field]: sectionsCount });
           */
        }

        invariant(false, 'unknown filter type');
        return acc;
      }, {});

    //go through instances and count derivedData
    _.forEach(filters, filter => {
      const { type, field } = filter;

      if (type === 'discrete') {
        _.forEach(filtered, instance => {
          derivedData[field][instance[filter.field]] += 1;
        });
      } else if (type === 'range') {
        /*const [ min, max ] = filter.range;
         const range = max - min; //use range if need to normalize, i.e. dont start at 0
         _.forEach(filtered, instance => {
         derivedData[field][Math.floor((instance[field] / max) * maxSections)] += 1;
         });
         */
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

    performance.mark('page - derived data');

    // could let refine panel get filter func etc itself...

    return (
      <div className="BrowsePage">
        <RefinePanel setFilter={setFilter}
                     filters={activeFilters}/>

        <div className="BrowsePage-main">
          <BrowseTable openInstances={this.openInstances.bind(this)}
                       instances={filteredIds}/>

          <BrowseCharts noInstances={filteredIds.length === 0}
                        derivedData={derivedData}/>
        </div>
      </div>
    );
  }
}

export default withRouter(BrowsePage);
