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
import {
  pie,
  arc,
  widthLargeInner as width,
  heightLargeInner as height,
  radius,
  keyFn,
  massageData,
  defaultColor
} from './constants';
import d3 from 'd3';
import { getRange } from '../../constants/filters';

import '../../styles/LineGraph.css';

//todo - need to wrap points with 0 points
//todo - add a mouseover to see (scaled) value

export default class LineGraph extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    color: PropTypes.string,
    data: PropTypes.object.isRequired,
  };

  static defaultProps = {
    color: defaultColor,
  };

  componentDidMount() {
    this.svg = d3.select(this.element);

    this.svg
      .attr("width", width)
      .attr("height", height);

    this.group = this.svg.append("g")
    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      .attr("transform", "translate(" + 20 + "," + height / 2 + ")");

    this.path = this.group.append('path')
      .attr('class', 'line');

    const domain = getRange(this.props.field);

    this.x = d3.scale.pow()
      .range([0, width])
      .domain(domain);

    this.y = d3.scale.log()
      .range([height, 0]);

    //shouldnt hit this - log data not handled in graph
    const log = (d) => {
      console.warn('problematic data point:', this.props.field, d);
      return 0;
    };

    this.line = d3.svg.line()
      .defined(function (d) {
        return d && Number.isFinite(+d.value);
      })
      .interpolate('basis')
      .x((d) => this.x(+d.key) || log(d))
      .y((d) => this.y(+d.value) || 0);

    this.area = d3.svg.area()
      .defined(this.line.defined())
      .x(this.line.x())
      .y1(this.line.y())
      .y0(this.y(1));

    this.update(this.props.data);
  }

  componentDidUpdate() {
    this.update(this.props.data);
  }

  update(data) {
    const ymin = this.y.domain()[0]; //technically the max, so it graphs like zero
    const keys = Object.keys(data).map(key => parseInt(key, 10) || 0).sort((a, b) => a - b);
    //insert values at start and end of domain
    const ends = [
      ...this.x.domain(),
      keys[0] - 2,
      keys[keys.length - 1],
    ].filter(key => key >= 0).reduce((acc, x) => Object.assign(acc, { [+x + 1]: ymin }), {});
    //const ends = {};

    //console.log(this.props.field, keys, ends);

    const massaged = massageData(Object.assign(ends, data), true);

    //ideally, we have default values, which are 0 for all points of domain when value undefined (can achieve by wrapping around each defined point with a point at 0)

    const rangeMax = Math.max(...massaged.map(datum => parseInt(datum.value, 10) || 0));

    //calculate domain scaling same way as sliders
    const expX = Math.floor(Math.log10((this.x.domain()[1]) / 100)) + 1;
    const expY = Math.floor(Math.log10(rangeMax)) || 1;

    //scale x domain (like sliders), except 1/exp because scaling other way
    this.x.exponent(1 / expX);

    //scale y domain (according to range)
    this.y
      .base(Math.pow(10, expY)) //this is pretty arbitrary
      .domain([1, rangeMax + 1]); //1 because log, but doesnt handle zero...

    this.path.datum(massaged)
    //.transition().duration(500) - transition requires points at each domain value
    //.attr('d', this.line);
      .attr('d', this.area);
  }

  render() {
    const { field, data, color } = this.props;
    const longName = fieldName(field);

    //console.log(field, data);

    return (
      <div className="Chart LineGraph">
        <span className="LineGraph-heading">
          {longName}
        </span>
        <svg className="LineGraph-graph"
             style={{ backgroundColor: color }}>
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
