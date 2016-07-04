import React, { Component, PropTypes } from 'react';
import { fieldName } from '../constants/rows';
import { filters } from '../constants/filters';

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

  resetFilter = () => {
    const { field } = this.props;
    this.props.setFilter({ [field]: filters.find(filter => filter.field === field).default });
  };

  hasFilter = (forceProps) => {
    const filter = this.props.filter;
    return Array.isArray(filter) ? !!filter.length :
      typeof filter === 'object' ? Object.keys(filter).length > 0: //todo - only when true
      !!filter;
  }

  render() {
    const { field, type, filter } = this.props;
    const { open } = this.state;
    const ControlComponent = RefineSection.componentMap[type];
    const hasFilter = this.hasFilter();
    const isActive = open || hasFilter;

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

        <div className="RefineSection-control">
          <ControlComponent {...this.props} />
        </div>
      </div>
    );
  }
}
