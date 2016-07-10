import React, { Component } from 'react';

import MoleculeViewer from '../MoleculeViewer';

export default class Proteins extends Component {
  static propTypes = {	
    id: PropTypes.string.isRequired,
  };

  makeUrl = () => {
    return `/`;
  };

  render() {
    return (
      <div className="Proteins">
      	<MoleculeViewer url={this.makeUrl()} />
      </div>
    );
  }
};
