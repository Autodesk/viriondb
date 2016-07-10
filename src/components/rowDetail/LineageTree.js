import React, { PropTypes, Component } from 'react';

export default class LineageTree extends Component {
  static propTypes = {	
    value: PropTypes.string.isRequired,
  };

  render() {
  	const tax = this.props.value.split(': ');
	/*
	.replace('[', '')
	.replace(']', '')
	.trim()
	.replace(/\'/gi, '')
	.split(', ');
	*/

    return (
      <div className="LineageTree">
        <ul>
      	  {tax.map(level => (<li>{level}</li>)) }
  	    </ul>
      </div>
    );
  }
};
