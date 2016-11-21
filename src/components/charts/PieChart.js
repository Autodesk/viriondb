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
import filters, { unknownValue } from '../../constants/filters';
import { toggleDiscreteFilter } from '../../data/activeFilters';
import {
  pie,
  arc,
  outerArc,
  width,
  height,
  radius,
  keyFn,
  massageData,
  defaultColor,
  transitionDuration,
  graphWidth,
  graphHeight,
} from './constants';
import d3 from 'd3';

import '../../styles/PieChart.css';

export default class PieChart extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    color: PropTypes.string,
    data: PropTypes.object.isRequired,
  };

  static defaultProps = {
    color: defaultColor,
  };

  componentDidMount() {
    //attach the chart to the page

    this.svg = d3.select(this.element);

    this.svg.append("g").attr("class", "slices");
    this.svg.append("g").attr("class", "labels");
    this.svg.append("g").attr("class", "lines");

    this.svg.attr("transform", "translate(" + (graphWidth / 2) + "," + (height / 2) + ")");

    this.update(this.props.data);
  }

  componentDidUpdate() {
    this.update(this.props.data);
    //update the chart
  }

  update(data) {
    const handleClick = (value) => toggleDiscreteFilter(this.props.field, value);
    const pieData = pie(massageData(data));
    const filtered = pieData.filter(d => (d.endAngle - d.startAngle) > 0.25);

    // PATHS

    //todo - ideally enter from right location and exit by collapsing, not just disappearing

    //update the pie sections
    const slice = this.svg.select(".slices").selectAll("path.slice")
      .data(pieData, keyFn);

    slice.enter()
      .append("path")
      .attr("class", "slice")
      .style("fill", () => this.props.color)
      .each(function (d) {
        this._current = d;
      })
      .style('cursor', 'pointer')
      .on('click', function (d) {
        handleClick(d.data.key);
      });

    //basic mouseover tooltip
    slice.append('title')
      .text(keyFn);

    slice
      .transition().duration(transitionDuration)
      .attrTween("d", function attrTween(d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return (t) => arc(interpolate(t));
      });

    slice.exit()
    /*
     .transition().duration(transitionDuration)
     .attrTween('d', function attrTween(d) {
     const interpolate = d3.interpolate(this._current, { value: 0 });
     return (t) => arc(interpolate(t));
     })
     */
      .remove();

    //TEXT

    const text = this.svg.select(".labels").selectAll('text')
      .data(filtered, keyFn);

    text.enter()
      .append('text')
      .attr('class', 'label')
      .style('opacity', 0)
      .style("fill", d => this.props.color)
      .each(function (d) {
        this._current = d;
      })
      .style('cursor', 'pointer')
      .on('click', function (d) {
        handleClick(d.data.key);
      })
      .text(d => `${d.data.key} (${d.data.value})`);

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    const PiIsh = Math.PI + 0.05;

    text.transition().duration(transitionDuration)
      .style('opacity', 1)
      .attrTween("transform", function (d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * ((midAngle(d2) <= PiIsh) ? 1 : -1);
          return "translate(" + pos + ")";
        };
      })
      .styleTween("text-anchor", function (d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          const d2 = interpolate(t);
          return (midAngle(d2) <= PiIsh) ? "start" : "end";
        };
      });

    text.exit()
      .transition().duration(transitionDuration / 2)
      .style('opacity', 0)
      .remove();

    //POLYLINES

    const polyline = this.svg.select(".lines").selectAll("polyline")
      .data(filtered, keyFn);

    polyline.enter()
      .append('polyline')
      .attr('class', 'PieChart-line')
      .each(function (d) {
        this._current = d;
      })
      .style('stroke', d => this.props.color)
      .style('opacity', 0);

    polyline.transition().duration(transitionDuration)
      .style('opacity', 1)
      .attrTween("points", function (d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) <= PiIsh ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit()
      .transition().duration(transitionDuration)
      .style('opacity', 0)
      .remove();
  }

  render() {
    const { data, field, color } = this.props;
    const longName = fieldName(field);
    const shortName = filters.find(filter => filter.field === field).shortname;
    const hasData = Object.keys(data).some(key => !!data[key]);
    const label = hasData ? shortName : 'No Data';

    return (
      <div className="Chart PieChart" style={{ color: color }}>
        <span className="PieChart-heading">
          {longName}
        </span>
        <span className={'PieChart-label' + (!hasData ? ' PieChart-label-empty' : '')}
              style={{ color: color }}>
          {label}
        </span>
        <svg className="PieChart-chart">
          <g ref={(el) => {
            if (el) {
              this.element = el;
            }
          }}/>
        </svg>
      </div>
    );
  }
}
