/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
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
