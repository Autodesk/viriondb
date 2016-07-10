import React, { PropTypes, Component } from 'react';

export default class BaltimoreGroup extends Component {
  static propTypes = {	
    value: PropTypes.string.isRequired,
  };

  constructor() {
  	super();

  	this.styles = {
  	  display: 'inline-block',
  	  padding: '2em',
  	  margin: '0 auto',
  	  height: '300px',
  	  width: 'auto',
  	};
  }

  makeImageUrl = () => `/images/baltimore/${this.props.value.toUpperCase()}.png`;

  render() {
    return (
      <div className="BaltimoreGroup">
      	<img style={this.styles}
      		 src={makeImageUrl()} />
      </div>
    );
  }
};
