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
//todo - range values should be dynamic, based on processing of data (at least include mix / max)

export const unknownValue = 'null';

export const filters = [
  {
    field: 'derived_baltimore',
    type: 'discrete',
    shortname: 'BG',
    color: '#D28482',
    default: {},
    values: {
      'I': 'I - double stranded DNA',
      'II': 'II - single stranded DNA',
      'III': 'III - double stranded RNA',
      'IV': 'IV - positive single stranded RNA',
      'V': 'V - negative single stranded RNA',
      'VI': 'VI - positive single stranded DNA, reverse transcribing',
      'VII': 'VII - double stranded DNA, reverse transcribing',
      [unknownValue]: 'Unknown',
    },
  },

  {
    field: 'derived_taxonomy_order',
    type: 'discrete',
    shortname: 'Or',
    color: '#efac7e',
    default: {},
    values: {
      Nidovirales: 'Nidovirales',
      Herpesvirales: 'Herpesvirales',
      Picornavirales: 'Picornavirales',
      Caudovirales: 'Caudovirales',
      Tymovirales: 'Tymovirales',
      Mononegavirales: 'Mononegavirales',
      Ligamenvirales: 'Ligamenvirales',
      Unassigned: 'Unassigned',
      [unknownValue]: 'Unknown',
    },
  },

  {
    field: 'division',
    type: 'discrete',
    shortname: 'Di',
    color: '#F1D26C',
    default: {},
    values: {
      'VRL': 'VRL',
      'PHG': 'PHG',
      'ENV': 'ENV',
      'SYN': 'SYN',
      //[unknownValue]: 'Unknown',
    },
  },

  {
    field: 'length',
    type: 'range',
    shortname: 'Le',
    color: '#65AAB1',
    default: [0, 2473870],
    range: [0, 2473870],
  },

  {
    field: 'genome_shape',
    type: 'discrete',
    shortname: 'GS',
    color: '#D3D34F',
    default: {},
    values: {
      circular: 'Circular',
      linear: 'Linear',
    },
  },

  {
    field: 'sequenced_mol',
    type: 'discrete',
    shortname: 'Mo',
    color: '#8EC78D',
    default: {},
    values: {
      'ss-DNA': 'ss-DNA',
      'ss-RNA': 'ss-RNA',
      'DNA': 'DNA',
      'RNA': 'RNA',
      'mRNA': 'mRNA',
      'cRNA': 'cRNA',
      'ds-RNA': 'ds-RNA',
      'ms-DNA': 'ms-DNA',
    },
  },

  /*
   //too many options
   {
   field: 'capsid_morphology',
   type: 'discrete',
   shortname: 'CM',
   color: '#aaeeaa',
   default: {},
   values: {
   'helical': 'Helical',
   'spherical': 'Spherical',
   'icosahedral': 'Icosahedral',
   'head-and-tail': 'Head-and-Tail',
   'spindled': 'Spindled',
   'non-canonical': 'Non-Canonical',
   [unknownValue]: 'Unknown',
   },
   },
   */

  {
    field: 'derived_sense',
    type: 'discrete',
    shortname: 'Se',
    color: '#65AAB1',
    default: {},
    values: {
      '+/-': '+/-',
      '+': '+',
      '-': '-',
      [unknownValue]: 'Unknown',
    },
  },

  {
    field: 'derived_protein_count',
    type: 'range',
    shortname: 'PN',
    color: '#FE8DD8',
    default: [0, 2541],
    range: [0, 2541],
  },

  {
    field: 'derived_segment_count',
    type: 'range',
    shortname: 'Sg',
    color: '#AF5DDA',
    default: [0, 105],
    range: [0, 105],
  },

  {
    field: 'name',
    visible: false,
    type: 'textFilter',
    default: [],
  },

  /*
   //forthcoming
   {
   field: 'derived_t_number',
   type: 'range',
   range: [0, 30],
   },
   */
];

export const getDefaultFilter = field => {
  const filter = filters.find(filter => filter.field === field);
  return filter['default'];
};

export const getRange = (field) => {
  const filter = filters.find(filter => filter.field === field);
  return filter ? filter.range : [0, 0];
};

export default filters;
