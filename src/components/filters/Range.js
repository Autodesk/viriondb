import React, { PropTypes, Component } from 'react';
import ReactSlider from 'react-slider';
import d3 from 'd3';
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
    defaultFilter: PropTypes.array.isRequired,
  };

  componentWillMount() {
    //todo - correct scaling - exponential scaling different in each direction
    //todo - choose exponent based on range
    const exp = Math.floor(Math.log10((this.props.range[1] - this.props.range[0]) / 100)) + 1;
    const up = d3.scale.pow().exponent(exp).domain([0, 100]).range(this.props.range);
    const down = up.invert;

    this.scaleUpFn = (val) => Math.round(up(val));
    this.scaleDownFn = (val) => Math.round(down(val));
  }

  onChange = (input) => {
    const next = isEqual(input, this.props.defaultFilter) ? null : input;
    const scaled = !!next ? next.map(this.scaleUpFn) : next;
    console.log('setting', scaled);

    this.props.setFilter({ [this.props.field]: scaled });
  };

  render() {
    const { range, field, color, filter, defaultFilter } = this.props;
    const filterValue = Array.isArray(filter) ? filter : defaultFilter;
    const scaledValue = filterValue.map(this.scaleDownFn);

    console.log('rendering', this.props.field, scaledValue, filterValue);

    return (
      <div className="Range">
        <ReactSlider onChange={this.onChange}
                     value={scaledValue}
                     min={0}
                     max={100}
                     withBars
                     className="Range-slider"
                     handleClassName="Range-handle"
                     barClassName="Range-bar"
                     pearling/>
        <div className="Range-labels">
          <div className="Range-label" style={{ left: scaledValue[0] + '%'}}>{filterValue[0]}</div>
          <div className="Range-label" style={{ right: (100 - scaledValue[1]) + '%'}}>{filterValue[1]}</div>
        </div>
      </div>
    );
  }
}
