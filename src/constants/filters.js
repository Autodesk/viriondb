//todo - reconcile shortname, color, etc with rows.js

//todo - range values should be dynamic, based on processing of data (at least include mix / max)

//todo - sync this with processing
const unknownValue = 'Unknown';

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
    field: 'capsid_morphology',
    type: 'discrete',
    color: '#aaeeaa',
    default: {},    
    values: {
      'helical': 'Helical',
      'spherical': 'Spherical',
      'icosahedral': 'Icosahedral',
      'head-and-tail': 'Head-and-Tail',
      'spindled': 'Spindled',
      'non-canonical': 'Non-Canonical',
      unknownValue: 'Unknown',
    },
  },

  {
    field: 'division',
    type: 'discrete',
    color: '#aaeeaa',
    default: {},    
    values: {
      "VRL": "VRL",
      "PHG": "PHG",
      "ENV": "ENV",
      "SYN": "SYN",
    },
  },

  {
    field: 'sense',
    type: 'discrete',
    color: '#aaeeee',
    default: {},    
    values: {
      "+/-": "+/-",
      "+": "+",
      "-": "-",
      unknownValue: 'Unknown',
    },
  },

  {
    field: 'derived_protein_count',
    type: 'range',
    color: '#aaeeee',
    default: [0, 541],
    range: [0, 2541],
  },

  {
    field: 'length',
    type: 'range',
    color: '#aaaaee',
    default: [0, 50000],
    range: [0, 50000],
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