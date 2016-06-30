import React, { Component, PropTypes } from 'react';

export default class Discrete extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
  };

  toggleValue = (value) => {
    const { field, filter, setFilter } = this.props;
    //treat as immutable, dont overwrite default
    const next = Object.assign({}, filter);
    if (next[filter]) {
      delete next[value];
    } else {
      next[value] = true;
    }
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
                 key={value}>
              <input type="checkbox"
                     onChange={(evt) => this.toggleValue(value)}
                     checked={filter[value]}/>
              {name}
            </div>
          );
        })}
      </div>
    );
  }
};
