import React, { Component, PropTypes } from 'react';
import Checkbox from '../Checkbox';
import { toggleDiscreteFilter } from '../../data/activeFilters';

import '../../styles/Discrete.css';

export default class Discrete extends Component {
  static propTypes = {
    filter: PropTypes.object,
    field: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    defaultFilter: PropTypes.any.isRequired,
  };

  render() {
    const { values, field, filter } = this.props;
    return (
      <div className="Discrete">
        {Object.keys(values).map(value => {
          const name = values[value];
          const checked = !!filter && filter[value];
          return (
            <div className="Discrete-option"
                 onClick={(evt) => toggleDiscreteFilter(field, value)}
                 key={value}>
              <Checkbox className="Discrete-checkbox"
                        checked={checked}/>
              <span className="Discrete-text">{name}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
