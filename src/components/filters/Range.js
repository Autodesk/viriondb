import React, { PropTypes, Component } from 'react';
import ReactSlider from 'react-slider';
import d3 from 'd3';
import { isEqual } from 'lodash';

import '../../styles/Range.css';

//todo - handle color passdown, may need to modify component directly
//todo - better hiding of labels, based on what handle is hovered

export default class Range extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.array,
    field: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    range: PropTypes.array.isRequired,
    defaultFilter: PropTypes.array.isRequired,
  };

  componentWillMount() {
    const exp = Math.floor(Math.log10((this.props.range[1] - this.props.range[0]) / 100)) + 1;
    const up = d3.scale.pow().exponent(exp).domain([0, 100]).range(this.props.range);
    const down = up.invert;

    this.state = {
      value: this.props.filter || this.props.defaultFilter,
    };

    this.scaleUpFn = (val) => Math.round(up(val));
    this.scaleDownFn = (val) => Math.round(down(val));
  }

  onChange = (input) => {
    const scaled = input.map(this.scaleUpFn);
    const isDefault = isEqual(scaled, this.props.defaultFilter);
    const next = isDefault ? null : scaled;

    this.setState({
      value: next,
    }, () => this.props.setFilter({ [this.props.field]: next }, isDefault));
  };

  render() {
    const { value } = this.state;
    const { range, field, color, filter, defaultFilter } = this.props;
    //prefer state value to props since filter takes a while to propagate
    const filterValue = Array.isArray(value) ? value : (Array.isArray(filter) ? filter : defaultFilter); //eslint-disable-line no-nested-ternary
    const scaledValue = filterValue.map(this.scaleDownFn);

    //console.log('rendering', this.props.field, scaledValue, filterValue);

    const left = scaledValue[0];
    const right = 100 - scaledValue[1];
    const hideLeft = (scaledValue[1] - left) < 25;
    const hideRight = right > 90;
    const leftLabel = filterValue[0] > 1000 ? `${Math.round(filterValue[0] / 1000)}k` : filterValue[0];
    const rightLabel = filterValue[1] > 1000 ? `${Math.round(filterValue[1] / 1000)}k` : filterValue[1];

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
                     style={{ backgroundColor: color }}
                     pearling/>
        <div className="Range-labels">
          <div className="Range-label"
               style={{ left: left + '%', opacity: (hideLeft ? '0' : '1') }}>
            {leftLabel}
          </div>
          <div className="Range-label"
               style={{ right: right + '%', opacity: (hideRight ? '0' : '1') }}>
            {rightLabel}
          </div>
        </div>
      </div>
    );
  }
}
