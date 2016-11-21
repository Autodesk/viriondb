/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Perf from 'react-addons-perf';
import _ from 'lodash';
import invariant from 'invariant';

import { mark, reset, dump } from '../data/performance';
import registry, { onRegister } from '../data/register';
import activeFilters, { setFilter, onFilterChange } from '../data/activeFilters';
import { unknownValue, filters } from '../constants/filters';

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

    this.filterListener = onFilterChange((filters, force) => {
      this.setState({ filters });
      if (force) {
        this.shouldUpdate = true;
      }
    });

    if (process.env.NODE_ENV !== 'production') {
      Perf.start();
      setTimeout(() => {
        Perf.stop();
        Perf.printWasted(Perf.getLastMeasurements());
        Perf.printExclusive(Perf.getLastMeasurements());
      }, 10000);
    }
  }

  shouldComponentUpdate() {
    return this.shouldUpdate;
  }

  componentDidUpdate() {
    mark('page - update done');
    dump();

    //debounce?
    this.shouldUpdate = true;
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

    if (filter.type === 'sort') {
      //dont do anything
      return null;
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

    reset();
    mark('page - renderStart');

    const createdFilters = this.createFilters();
    const filterFunc = createdFilters.length === 0 ?
      () => true :
      instance => _.every(createdFilters, filter => filter(instance));

    const filtered = _.filter(_.values(registry), filterFunc);

    mark('page - filtered');

    const sortFilter = activeFilters.sort;
    const sorted = (sortFilter !== 'name') ? _.sortBy(filtered, [ sortFilter ]) : filtered;

    mark('page - sorted');

    const filteredIds = sorted.map(item => item.id);

    /* derived data */

    //may want to compute alongside filtering so only pass through once

    //set it up
    const derivedData = filters
      .filter(filter => filter.visible !== false)
      //sort so the pie charts show up first
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

        if (derivedData[field][unknownValue] > 0) {
          derivedData[field]['Unknown'] = derivedData[field][unknownValue];
          delete derivedData[field][unknownValue];
        }
      }
    });

    mark('page - derived data');

    // could let refine panel get filter func etc itself...

    return (
      <div className="BrowsePage">
        <RefinePanel filters={activeFilters}/>

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
