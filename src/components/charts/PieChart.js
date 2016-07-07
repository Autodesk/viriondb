import React, {Component, PropTypes} from 'react';
import { fieldName } from '../../constants/rows';
import { pie, arc, width, height, radius, keyFn, massageData } from './constants';
import d3 from 'd3';

import '../../styles/PieChart.css';

export default class PieChart extends Component {
  static propTypes = {
  	field: PropTypes.string.isRequired,
  	color: PropTypes.string,
  	data: PropTypes.object.isRequired,
  };

  static defaultProps = {
  	color: '#9999dd',
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
		.data(pie(massageData(data)), keyFn);

  	slice.enter()
  		.insert("path")
  		.style("fill", d => this.props.color)
  		.attr("class", "slice");

  	slice		
  		.transition().duration(1000)
  		.attrTween("d", (d) => {
  			this._current = this._current || d;
  			var interpolate = d3.interpolate(this._current, d);
  			this._current = interpolate(0);
  			return (t) => arc(interpolate(t));
  		});

  	slice.exit()
  		.remove();
  }

  render() {
    const { field, color } = this.props;
    const longName = fieldName(field);
    //temp, also center bettere
    const shortName = field.substring(0,2).toUpperCase();

    return (
        <div className="PieChart">
          <span className="PieChart-heading"
                style={{color: color}}>
            {longName}
          </span>
          <span className="PieChart-label"
                style={{color: color}}>
            {shortName}
          </span>
          <svg className="PieChart-chart">
          	 <g ref={(el) => { if (el) { this.element = el; }}}></g>
          </svg>
        </div>
    );
  }
};
