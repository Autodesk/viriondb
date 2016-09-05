import React, { PropTypes, Component } from 'react';

export default class Host extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="Host"></div>
    );
  }
};
