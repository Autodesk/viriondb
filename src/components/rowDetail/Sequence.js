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
import getSequence from '../../data/sequence';

import '../../styles/Sequence.css';

export default class Sequence extends Component {
  static propTypes = {
    instance: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    sequence: null,
  };

  componentDidMount() {
    getSequence(this.props.instance.id)
      .then(sequence => this.setState({ sequence }));
  }

  render() {
    const fasta = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=${this.props.instance.id}&rettype=fasta&retmode=text`;
    const genbank = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=${this.props.instance.id}&rettype=gb&retmode=text`;

    const sequence = !this.state.sequence ?
      '...' :
    this.state.sequence.substring(0, 25) + '...';

    return (
      <div className="Sequence">
        <div className="Sequence-downloads">
          <a className="Sequence-link"
             download={this.props.instance.name + '.gb'}
             href={genbank}
             target="_blank">Genbank</a>
          <a className="Sequence-link"
             download={this.props.instance.name + '.gb'}
             href={fasta}
             target="_blank">Fasta</a>
        </div>
        <div className="Sequence-string">{sequence}</div>
      </div>
    );
  }
}
