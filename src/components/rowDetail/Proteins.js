import React, { PropTypes, Component } from 'react';

import MoleculeViewer from '../MoleculeViewer';

export default class Proteins extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  makeUrl = () => {
    return `/`;
  };

  render() {
    return (
      <div className="Proteins">
        <MoleculeViewer url={this.makeUrl()}/>
      </div>
    );
  }
};
