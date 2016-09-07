import React, { Component, PropTypes } from 'react';
import { fieldName } from '../constants/rows';
import { filters } from '../constants/filters';
import { cloneDeep, isEqual } from 'lodash';

import Discrete from './filters/Discrete';
import Range from './filters/Range';

import '../styles/RefineSection.css';

export default class RefineSection extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
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

  resetFilter = () => {
    const { field } = this.props;

    //set to default
    //this.props.setFilter({ [field]: this.getDefault() });

    this.props.setFilter({ [field]: null }, true);
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
    const { field, type, filter } = this.props;
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
             onClick={() => this.resetFilter()}>
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
