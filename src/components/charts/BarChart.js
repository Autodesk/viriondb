import React, {Component, PropTypes} from 'react';
import { fieldName } from '../../constants/rows';
import { pie, arc, width, height, radius, keyFn, massageData } from './constants';
import d3 from 'd3';

export default class BarChart extends Component {
  static propTypes = {
  	field: PropTypes.string.isRequired,
  	color: PropTypes.string,
  	data: PropTypes.array.isRequired,
  };

  static defaultProps = {
  	color: '#9999dd',
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

    return (
        <svg className="BarChart" 
        	 ref={(el) => { if (el) { this.element = el; }}}>
        </svg>
    );
  }
};
