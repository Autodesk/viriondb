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
import React, { Component, PropTypes } from 'react';
import { fieldName } from '../../constants/rows';
import { pie, arc, width, height, radius, keyFn, massageData, defaultColor } from './constants';
import d3 from 'd3';

import '../../styles/BarChart.css';

export default class BarChart extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    color: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    color: defaultColor,
  };

  componentDidMount() {
    //attach the chart to the page

    this.svg = d3.select(this.element)
      .append("g");

    this.update(this.props.data);
  }

  componentDidUpdate() {
    this.update(this.props.data);
    //update the chart
  }

  componentWillUnmount() {
    //todo - cleanup
  }

  update(data) {
    //todo
  }

  render() {
    const { field, data, color } = this.props;
    const longName = fieldName(field);

    console.log(field, data);

    return (
      <div className="Chart BarChart" style={{ backgroundColor: color, color: color }}>
        <span className="BarChart-heading">
          {longName}
        </span>
        <svg className="BarChart-chart">
          <g ref={(el) => {
            if (el) {
              this.element = el;
            }
          }}/>
        </svg>
      </div>
    );
  }
};
