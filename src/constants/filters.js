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
