import React, { PropTypes, Component } from 'react';
import ReactSlider from 'react-slider';

import '../../styles/Range.css';

//should be logarithmic... maybe need to pass in std deviation too / some way to know where to weight the scale
//should handle conversion here, need to relay to handles somehow (or show ourselves)... might be easier to write from scratch

export default class Range extends Component {
  static propTypes = {
  	setFilter: PropTypes.func.isRequired,
  	filter: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
  	range: PropTypes.array.isRequired,
  };

  getValue = () => {
  	if (!this.rangeSlider) { return; }
  	return this.rangeSlider.getValue();
  };

  onChange = (next) => {

  	this.props.setFilter(next);
  }

  render() {
  	const { range, field, color, filter } = this.props;

    return (
  		<ReactSlider onChange={this.onChange}
      				 value={filter}
      				 min={range[0]}
      				 max={range[1]}
      				 ref={(el) => { if (el) { this.rangeSlider = el; }}}
      				 withBars
      				 className="Range"
      				 handleClassName="Range-handle"
      				 barClassName="Range-bar"
      				 pearling />
    );
  }
};
