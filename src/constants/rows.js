import { capitalize } from 'lodash';

export const rows = [
  'name',
  'accession',
  'description',
  'derived_baltimore',
  'nucleid_acid_structure',
  'nucleic_acid_shape',
  'genome_shape',
  'derived_sense',
  'length',
  'derived_protein_count',
  'capsid_morphology',
  'capsid_envelope',
  'temperature',
  'order',
  'family',
  'subfamily',
  'genus',
  'host',
  'derived_lineage',
  'taxonomy',
];

//otherwise, just uppsercase it
export const rowNames = {
  accession: 'Accession Number',
  derived_baltimore: 'Baltimore Group',
  derived_sense: 'Sense',
  sequence_mol: 'Nucleic Acid Molecule',
  nucleid_acid_structure: 'Nucleic Acid Structure',
  nucleic_acid_shape: 'Nucleid Acid Shape',
  genome_shape: 'Nucleid Acid Strandedness',
  derived_protein_count: 'Protein Number',
  capsid_morphology: 'Capsid Morphology',
  capsid_envelope: 'Capsid Envelope',
  taxonomy: 'Host Taxonomy',
  derived_taxonomy_family: 'Family',
  derived_taxonomy_order: 'Order',
  derived_taxonomy_genus: 'Genus',
};

export const fieldName = (field) => {
  return rowNames[field] || capitalize(field);
};

export const rowHierarchy = [
  {
    name: 'Name Data',
    fields: [
      'name',
      'accession',
    ],
  },
  {
    name: 'Genome Data',
    fields: [
      'derived_baltimore',
      'nucleid_acid_structure',
      'nucleic_acid_shape',
      'genome_shape',
      'length',
      'derived_sense',
    ],
  },
  {
    name: 'Morphology',
    fields: [
      'capsid_morphology',
      'capsid_envelope',
      'derived_protein_count',
    ],
  },
  {
    name: 'Host',
    fields: [
      'host',
      'temperature',
    ],
  },
  {
    name: 'Taxonomy',
    fields: [
      'derived_taxonomy_family',
      'subfamily',
      'derived_taxonomy_order',
      'derived_taxonomy_genus',
    ],
  },
];
