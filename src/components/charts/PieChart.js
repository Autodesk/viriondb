import React, { Component, PropTypes } from 'react';
import { fieldName } from '../../constants/rows';
import filters from '../../constants/filters';
import { pie, arc, width, height, radius, keyFn, massageData, defaultColor } from './constants';
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

    this.svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
    //update the pie sections
    const slice = this.svg.select(".slices").selectAll("path.slice")
      .data(pie(massageData(data)));

    slice.enter()
      .append("path")
      .style("fill", d => this.props.color)
      .attr("class", "slice")
      .each(function (d) {
        this._current = d
      });

    slice
      .transition().duration(500)
      .attrTween("d", function attrTween(d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return (t) => arc(interpolate(t));
      });

    slice.exit()
      .remove();
  }

  render() {
    const { field, color } = this.props;
    const longName = fieldName(field);
    const shortName = filters.find(filter => filter.field === field).shortname;

    return (
      <div className="Chart PieChart">
        <span className="PieChart-heading"
              style={{ color: color }}>
          {longName}
        </span>
        <span className="PieChart-label"
              style={{ color: color }}>
          {shortName}
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
