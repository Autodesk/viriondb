import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';

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

    const id = this.props.instance.ncbi_uid;

    if (!!id) {
      this.ncbiLink = `https://www.ncbi.nlm.nih.gov/protein?LinkName=nuccore_protein&from_uid=${id}`;
      /*
      const proteinUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=protein&retmode=json&id=${id}`;
      fetch(proteinUrl)
        .then(resp => resp.json())
        .then(json => json.result[id])
        .then(result => )
      */
    }
  }

  render() {
    const moleculeViewer = null; //<MoleculeViewer url={this.makeUrl()}/>

    return (
      <div className="Proteins">
        {moleculeViewer}

        {this.ncbiLink && <a className="ComparisonRow-link ComparisonRow-offsite"
                             href={this.ncbiLink}
                             target="_blank">NCBI Proteins</a>}
      </div>
    );
  }
};
