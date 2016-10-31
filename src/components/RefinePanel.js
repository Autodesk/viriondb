import React, { Component, PropTypes } from 'react';
import { filters as filterSections } from '../constants/filters';
import RefineSection from './RefineSection';

import '../styles/RefinePanel.css';

export default class RefinePanel extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
  };

  render() {
    const { filters } = this.props;

    return (
      <div className="RefinePanel">
        <div className="RefinePanel-heading">
          Refine By
        </div>

        {filterSections.filter(section => section.visible !== false)
          .map(section => {
            const { field, type, ...rest } = section;
            return (
              <RefineSection key={field}
                             field={field}
                             type={type}
                             {...rest}
                             color={section.color}
                             filter={filters[field]}/>
            );
          })}
      </div>
    );
  }
}
