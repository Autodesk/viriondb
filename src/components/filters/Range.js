import React, { PropTypes, Component } from 'react';
import ReactSlider from 'react-slider';
import { isEqual } from 'lodash';

import '../../styles/Range.css';

//should be logarithmic... maybe need to pass in std deviation too / some way to know where to weight the scale
//should handle conversion here, need to relay to handles somehow (or show ourselves)... might be easier to write from scratch
//also need to handle color passdown, may need to modify component directly

export default class Range extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.array,
    field: PropTypes.string.isRequired,
    range: PropTypes.array.isRequired,
    defaultFilter: PropTypes.any.isRequired,
  };

  getValue = () => {
    if (!this.rangeSlider) {
      return null;
    }
    return this.rangeSlider.getValue();
  };

  onChange = (input) => {
    const next = isEqual(input, this.props.defaultFilter) ? null : input;
    this.props.setFilter({ [this.props.field]: next });
  };

  render() {
    const { range, field, color, filter, defaultFilter } = this.props;
    const filterValue = Array.isArray(filter) ? filter : defaultFilter;

    return (
      <ReactSlider onChange={this.onChange}
                   value={filterValue}
                   min={range[0]}
                   max={range[1]}
                   ref={(el) => { if (el) { this.rangeSlider = el; }}}
                   withBars
                   className="Range"
                   handleClassName="Range-handle"
                   barClassName="Range-bar"
                   pearling/>
    );
  }
}
