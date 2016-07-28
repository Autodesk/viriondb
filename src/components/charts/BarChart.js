import React, {Component, PropTypes} from 'react';
import { fieldName } from '../../constants/rows';
import { pie, arc, width, height, radius, keyFn, massageData, defaultColor } from './constants';
import d3 from 'd3';

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
    //todo - get label for tooltip from filters.js

    return (
        <svg className="BarChart" 
        	 ref={(el) => { if (el) { this.element = el; }}}>
        </svg>
    );
  }
};