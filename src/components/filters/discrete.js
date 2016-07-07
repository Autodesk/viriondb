import React, { Component, PropTypes } from 'react';
import Checkbox from '../Checkbox';

import '../../styles/Discrete.css';

export default class Discrete extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
  };

  toggleValue = (value) => {
    const { field, filter, setFilter } = this.props;
    //todo - can remove since clone higher up now
    //treat as immutable, dont overwrite default
    const next = Object.assign({}, filter);
    if (next[value]) {
      delete next[value];
    } else {
      next[value] = true;
    }
    console.log(next);
    setFilter({ [field]: next });
  };

  render() {
    const { values, filter } = this.props;
    return (
      <div className="Discrete">
        {Object.keys(values).map(value => {
          const name = values[value];
          return (
            <div className="Discrete-option"
                 onClick={(evt) => this.toggleValue(value)}
                 key={value}>
              <Checkbox className="Discrete-checkbox"
                        checked={filter[value]}/>
              <span className="Discrete-text">{name}</span>
            </div>
          );
        })}
      </div>
    );
  }
};
