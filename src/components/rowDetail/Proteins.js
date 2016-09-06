import React, { PropTypes, Component } from 'react';

import MoleculeViewer from '../MoleculeViewer';

export default class Proteins extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    instance: PropTypes.object.isRequired,
  };

  makeUrl = () => {
    return `/`;
  };

  componentWillUpdate(nextProps) {
    this.ncbiLink = null;

    const id = this.props.instance.id;

    //todo - fetch and set ncbiLink for proteins
  }

  render() {
    const moleculeViewer = null; //<MoleculeViewer url={this.makeUrl()}/>

    return (
      <div className="Proteins">
        {moleculeViewer}

        {this.ncbiLink && <a className="ComparisonRow-link ComparisonRow-offsite"
           href={this.ncbiLink}
           target="_blank">NCBI Proteins</a>
      </div>
    );
  }
};
