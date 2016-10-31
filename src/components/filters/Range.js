/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import React, { PropTypes, Component } from 'react';
import ReactSlider from 'react-slider';
import d3 from 'd3';
import { isEqual } from 'lodash';
import { setFilter } from '../../data/activeFilters';

import '../../styles/Range.css';

//todo - handle color passdown, may need to modify component directly
//todo - better hiding of labels, based on what handle is hovered

export default class Range extends Component {
  static propTypes = {
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

  componentDidMount() {
    //set the color on the slider... no real good way to do this (inheriting doesn't work without DOM element hack, so lets just do this)
    try {
      this.rangeSlider.refs.slider.style.backgroundColor = this.props.color;
    } catch (err) {
      //just let it stick to the default
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.filter) {
      this.setState({ value: this.props.defaultFilter });
    }
  }

  onChange = (input) => {
    const scaled = input.map(this.scaleUpFn);
    const isDefault = isEqual(scaled, this.props.defaultFilter);
    const next = isDefault ? null : scaled;

    this.setState({
      value: next,
    }, () => setFilter({ [this.props.field]: next }, isDefault));
  };

  round(num) {
    if (num > 100000) {
      return `${Math.round(num / 1000)}k`;
    }
    if (num > 1000) {
      return `${Math.round(num / 100) / 10}k`;
    }
    return num;
  }

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
    const leftLabel = this.round(filterValue[0]);
    const rightLabel = this.round(filterValue[1]);

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
                     ref={(el) => {
                       if (el) {
                         this.rangeSlider = el;
                       }
                     }}
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
