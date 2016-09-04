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
    //todo - verify this
    const id = this.props.instance.id;
    const nuccore = `https://www.ncbi.nlm.nih.gov/nuccore/${id}`;

    //todo - not real. need UUID from genbank, or to run an eSearch and find these
    const proteins = `https://www.ncbi.nlm.nih.gov/protein/${id}`;

    const moleculeViewer = null; //<MoleculeViewer url={this.makeUrl()}/>

    return (
      <div className="Proteins">
        {moleculeViewer}
      </div>
    );
  }
};
