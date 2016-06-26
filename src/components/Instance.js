import React, { Component, PropTypes } from 'react';

export default class Instance extends Component {
  static propTypes = {
    params: PropTypes.shape({
      instanceId: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className="Instance">
        <p>Instance {this.props.params.instanceId}</p>
      </div>
    );
  }
}
