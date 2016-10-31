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
import { fieldName } from '../constants/rows';
import { filters } from '../constants/filters';
import { cloneDeep, isEqual } from 'lodash';
import { resetFilter } from '../data/activeFilters';

import Discrete from './filters/Discrete';
import Range from './filters/Range';

import '../styles/RefineSection.css';

export default class RefineSection extends Component {
  static propTypes = {
    filter: PropTypes.any,
    field: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['discrete', 'range']).isRequired,
  };

  state = {
    open: false,
  };

  static componentMap = {
    discrete: Discrete,
    range: Range,
  };

  toggleOpen = () => {
    if (this.hasFilter()) {
      return;
    }
    this.setState({ open: !this.state.open });
  };

  getDefault = () => {
    const def = filters.find(filter => filter.field === this.props.field).default;
    return cloneDeep(def);
  };

  resetThisFilter = () => {
    const { field } = this.props;
    resetFilter(field);
  };

  hasFilter = (forceProps = {}) => {
    const filter = forceProps.filter || this.props.filter;
    if (!filter) {
      return false;
    }

    if (Array.isArray(filter)) {
      return filter.length > 0;
    }

    if (typeof filter === 'object') {
      return Object.keys(filter).length > 0;
    }

    return !!filter;
  };

  render() {
    const { field, type } = this.props;
    const { open } = this.state;
    const ControlComponent = RefineSection.componentMap[type];
    const hasFilter = this.hasFilter();
    const isActive = open || hasFilter;
    const defaultFilter = this.getDefault();

    return (
      <div className={'RefineSection' +
      (isActive ? ' active' : '') +
      (hasFilter ? ' hasFilter' : '')}>
        <div className="RefineSection-heading"
             onClick={this.toggleOpen}>
          {fieldName(field)}
        </div>

        <div className="RefineSection-reset action"
             onClick={() => this.resetThisFilter()}>
          Reset
        </div>

        {isActive && (<div className="RefineSection-control">
          <ControlComponent {...this.props}
                            defaultFilter={defaultFilter}/>
        </div>)}
      </div>
    );
  }
}
