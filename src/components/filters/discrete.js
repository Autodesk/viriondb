import React, { Component, PropTypes } from 'react';

export default class Discrete extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
  };

  toggleValue = (value) => {
    const { field, filter, setFilter } = this.props;
    //treat as immutable, dont overwrite default
    const next = filter.slice();
    const index = filter.indexOf(value);
    if (index >= 0) {
      next.splice(index, 1);
    } else {
      next.push(value);
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
                     checked={filter.indexOf(value) >= 0}/>
              {name}
            </div>
          );
        })}
      </div>
    );
  }
};
