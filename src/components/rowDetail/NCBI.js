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
import React from 'react';

import '../../styles/NCBI.css';

export default function NCBI({ field, value, instance }) {
  if (!value) {
    return null;
  }

  const nuccore = `https://www.ncbi.nlm.nih.gov/nuccore/${value}`;

  const fasta = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=${value}&rettype=fasta&retmode=text`;

  return (
    <div className="NCBI">
      <a className="NCBI-nuccore"
         href={nuccore}
         target="_blank">Nuccore</a>
      <a className="NCBI-fasta"
         href={fasta}
         target="_blank">Fasta</a>
    </div>
  );
}
