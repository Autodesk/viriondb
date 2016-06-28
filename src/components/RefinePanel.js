import React, { Component, PropTypes } from 'react';

import { filters as filterSections } from '../constants/filters';

import RefineSection from './RefineSection';

import '../styles/RefinePanel.css';

export default class RefinePanel extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const { setFilter, filters } = this.props;

    return (
      <div className="RefinePanel">
        <div className="RefinePanel-heading">
          Refine By
        </div>

        {filterSections.map(section => {
          const { field, type, ...rest } = section;
          return (
            <RefineSection key={field}
                           field={field}
                           type={type}
                           {...rest}
                           filter={filters[field]}
                           setFilter={setFilter}/>
          );
        })}
      </div>
    );
  }
}
