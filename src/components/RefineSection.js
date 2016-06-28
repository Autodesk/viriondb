import React, { Component, PropTypes } from 'react';
import { fieldName } from '../constants/rows';

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

  static componentMap = {
    discrete: Discrete,
    range: Range,
  };

  resetFilter = () => {
    this.props.setFilter({ [this.props.field]: null });
  };

  render() {
    const { field, type, filter, setFilter, ...rest } = this.props;
    const ControlComponent = RefineSection.componentMap[type];
    const isActive = !!filter;

    return (
      <div className={'RefineSection' + (isActive ? ' active' : '')}>
        <div className="RefineSection-heading">
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
