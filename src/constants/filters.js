//todo - sync this with processing
//todo - range values should be dynamic, based on processing of data
const unknownValue = 'Unknown';

export const filters = [
  {
    field: 'derived_baltimore',
    type: 'discrete',
    values: {
      1: 'I - double stranded DNA',
      2: 'II - single stranded DNA',
      3: 'III - double stranded RNA',
      4: 'IV - positive single stranded RNA',
      5: 'V - negative single stranded RNA',
      6: 'VI - positive single stranded DNA, reverse transcribing',
      7: 'VII - double stranded DNA, reverse transcribing',
    },
  },
  {
    field: 'capsid_morphology',
    type: 'discrete',
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
    field: 'length',
    type: 'range',
    range: [0, 12],
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