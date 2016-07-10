import React, {Component, PropTypes} from 'react';
import { fieldName } from '../../constants/rows';
import { pie, arc, width, height, radius, keyFn, massageData, defaultColor } from './constants';
import d3 from 'd3';

import '../../styles/LineGraph.css';

export default class LineGraph extends Component {
  static propTypes = {
  	field: PropTypes.string.isRequired,
  	color: PropTypes.string,
  	data: PropTypes.object.isRequired,
    interpolate: PropTypes.bool,
  };

  static defaultProps = {
  	color: defaultColor,
  };

  componentDidMount() {
  	this.svg = d3.select(this.element);

	  this.update(this.props.data);
  }

  componentDidUpdate() {
  	this.update(this.props.data);
  }

  componentWillUnmount() {
  	//todo - cleanup
  }

  update(data) {
  	//todo
  }

  render() {
    const { field, color } = this.props;
    const longName = fieldName(field);

    return (
      <div className="LineGraph"
           style={{backgroundColor: color}}>
        <span className="LineGraph-heading">
          {longName}
        </span>
        <svg className="LineGraph-graph" 
        	 <g ref={(el) => { if (el) { this.element = el; }}}></g>
        </svg>
      </div>
    );
  }
};
