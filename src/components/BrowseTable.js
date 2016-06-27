import React, { Component, PropTypes } from 'react';

import '../styles/BrowseTable.css';

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  render() {
    const { instances } = this.props;

    return (
      <div className="BrowseTable">
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>
        </div>
        
        
      </div>
    );
  }
};
