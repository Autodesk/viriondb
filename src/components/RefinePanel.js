import React, { Component, PropTypes } from 'react';

import { rows } from '../constants/rows';

import RefineSection from './RefineSection';

import '../styles/RefinePanel.css';

export default class RefinePanel extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  //todo - specify somewhere which rows to use, format for filters

  render() {
    const { setFilter, filters } = this.props;

    return (
      <div className="RefinePanel">
        <div className="RefinePanel-heading">
          Refine By
        </div>

        {['derived_baltimore'].map(name => {
          return (
            <RefineSection key={name}
                           name={name}
                           filter={filters[name]}
                           setFilter={setFilter}/>
          );
        })}
      </div>
    );
  }
}
