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

    this.update(this.props.data);
  }

  componentDidUpdate() {
    this.update(this.props.data);
  }

  componentWillUnmount() {
    //todo - cleanup
  }

  update(data) {
    const massaged = massageData(data);

    const domain = getRange(this.props.field);

    const rangeMax = Math.max(...massaged.map(datum => parseInt(datum.value, 10) || 0));

    const x = d3.scale.linear()
      .range([0, width])
      .domain(domain);

    const y = d3.scale.log()
      .base(10)
      .range([height, 0])
      .domain([1, rangeMax]); //1 because log

    //console.log(this.props.field, x.domain(), y.domain());

    const line = d3.svg.line().interpolate('basis');

    //todo - show line at zero even if no data
    //todo - interpolate line, transitions

    line.x(function (d) {
      return x(d.key);
    });
    line.y(function (d) {
      return y(d.value) || 0;
    });

    this.path.datum(massaged)
      .attr('d', line);
  }

  render() {
    const { field, data, color } = this.props;
    const longName = fieldName(field);

    //console.log(field, data);

    return (
      <div className="Chart LineGraph"
           style={{ backgroundColor: color }}>
        <span className="LineGraph-heading">
          {longName}
        </span>
        <svg className="LineGraph-graph">
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
