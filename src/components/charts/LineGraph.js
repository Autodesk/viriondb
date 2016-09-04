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

    const domain = getRange(this.props.field);

    this.x = d3.scale.linear()
      .range([0, width])
      .domain(domain);

    this.y = d3.scale.log()
      .range([height, 0]);

    this.line = d3.svg.line()
      .defined(function (d) {
        return d && Number.isFinite(+d.value);
      })
      .interpolate('basis')
      .x((d) => this.x(d.key))
      .y((d) => this.y(d.value) || 0);

    this.area = d3.svg.area()
    //.defined(this.line.defined())
      .x(this.line.x())
      .y1(this.line.y())
      .y0(this.y(1));

    this.update(this.props.data);
  }

  componentDidUpdate() {
    this.update(this.props.data);
  }

  componentWillUnmount() {

  }

  update(data) {
    //insert values at start and end of domain
    const ends = this.x.domain().reduce((acc, x) => Object.assign(acc, { [x]: 0 }), {});

    const massaged = massageData(Object.assign(ends, data), true);

    //todo - need default values, which are 0 when undefined
    //todo - dynamic scaling
    //todo - ideally, dont use log scale, so can show 0

    //console.log(massaged.map(d => `${d.key} - ${d.value}`));

    const rangeMax = Math.max(...massaged.map(datum => parseInt(datum.value, 10) || 0));
    const exp = Math.floor(Math.log10(rangeMax)) || 1;

    console.log(this.props.field, rangeMax, this.x.domain()[1], exp);

    this.y
      .base(10 * exp)
      .domain([1, rangeMax]); //1 because log, but doesnt handle zero...

    this.path.datum(massaged)
    //.attr('d', this.line);
      .attr('d', this.area);
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
