//todo - reconcile shortname, color, etc with rows.js

//todo - range values should be dynamic, based on processing of data (at least include mix / max)

//todo - sync this with processing - need to be able to filter based on value not known. or special handling for null
export const unknownValue = null;

//max number of pie sections e.g for a range
export const maxSections = 8;

export const filters = [
  {
    field: 'derived_baltimore',
    type: 'discrete',
    shortname: 'BC',
    color: '#eeaaaa',
    default: {},
    values: {
      '1': 'I - double stranded DNA',
      '2': 'II - single stranded DNA',
      '3': 'III - double stranded RNA',
      '4': 'IV - positive single stranded RNA',
      '5': 'V - negative single stranded RNA',
      '6': 'VI - positive single stranded DNA, reverse transcribing',
      '7': 'VII - double stranded DNA, reverse transcribing',
    },
  },

  {
    field: 'derived_taxonomy_order',
    type: 'discrete',
    shortname: 'Or',
    color: '#aaccff',
    default: {},
    values: {
      Nidovirales: 'Nidovirales',
      Herpesvirales: 'Herpesvirales',
      Picornavirales: 'Picornavirales',
      Caudovirales: 'Caudovirales',
      Tymovirales: 'Tymovirales',
      Mononegavirales: 'Mononegavirales',
      Ligamenvirales: 'Ligamenvirales',
      [unknownValue]: 'Unknown',
    },
  },

  {
    field: 'division',
    type: 'discrete',
    shortname: 'Di',
    color: '#aaeeaa',
    default: {},
    values: {
      'VRL': 'VRL',
      'PHG': 'PHG',
      'ENV': 'ENV',
      'SYN': 'SYN',
      [unknownValue]: 'Unknown',
    },
  },

  {
    field: 'length',
    type: 'range',
    shortname: 'Le',
    color: '#aaaaee',
    default: [0, 2473870],
    range: [0, 2473870],
  },

  {
    field: 'genome_shape',
    type: 'discrete',
    shortname: 'GS',
    color: '#ffccaa',
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
    color: '#ccffaa',
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
    field: 'sense',
    type: 'discrete',
    shortname: 'Se',
    color: '#aaeeee',
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
    color: '#aaeeee',
    default: [0, 541],
    range: [0, 2541],
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
   field: 't_number',
   type: 'range',
   range: [0, 30],
   },
   */
];

export default filters;
