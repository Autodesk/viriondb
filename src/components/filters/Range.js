import React, { Component } from 'react';

//should be logarithmic... maybe need to pass in std deviation too / some way to know where to weight the scale

export default class Range extends Component {
  render() {
    return (
      <div className="Range">
        <input type="range" />
    	<span>todo</span>
      </div>
    );
  }
};
