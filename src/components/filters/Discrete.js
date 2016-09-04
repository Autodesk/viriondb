import React, { Component, PropTypes } from 'react';
import Checkbox from '../Checkbox';

import '../../styles/Discrete.css';

export default class Discrete extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.object,
    field: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    defaultFilter: PropTypes.any.isRequired,
  };

  toggleValue = (value) => {
    const { field, filter, setFilter, defaultFilter } = this.props;
    let next = Object.assign({}, defaultFilter, filter);
    if (next[value]) {
      delete next[value];
    } else {
      next[value] = true;
    }

    if (Object.keys(next).length === 0) {
      next = null;
    }

    setFilter({ [field]: next });
  };

  render() {
    const { values, color, filter } = this.props;
    return (
      <div className="Discrete">
        {Object.keys(values).map(value => {
          const name = values[value];
          const checked = !!filter && filter[value];
          return (
            <div className="Discrete-option"
                 onClick={(evt) => this.toggleValue(value)}
                 key={value}>
              <Checkbox className="Discrete-checkbox"
                        color={color}
                        checked={checked}/>
              <span className="Discrete-text">{name}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
