import { capitalize } from 'lodash';

export const rows = [
  'name',
  'id', //accession-version (not just accession)
  'description',
  'derived_baltimore',
  'derived_segment_count',
  'nucleid_acid_structure',
  'genome_shape',
  'derived_sense',
  'length',
  'derived_protein_count',
  'capsid_morphology',
  'capsid_envelope',
  //'temperature',
  'host',
  'derived_lineage',
  'taxonomy',
  'order',
  'family',
  'subfamily',
  'genus',
];

//otherwise, just uppsercase it
export const rowNames = {
  id: 'Accession Number',
  accession: 'Accession Number',
  derived_baltimore: 'Baltimore Group',
  derived_sense: 'Sense',
  sequenced_mol: 'Nucleic Acid Molecule',
  nucleid_acid_structure: 'Nucleic Acid Structure',
  nucleic_acid_shape: 'Nucleid Acid Shape',
  genome_shape: 'Genome Shape',
  derived_protein_count: 'Protein Count',
  derived_segment_count: 'Segments',
  capsid_morphology: 'Capsid Morphology',
  capsid_envelope: 'Capsid Envelope',
  taxonomy: 'Host Taxonomy',
  derived_lineage: 'Lineage',
  derived_taxonomy_family: 'Family',
  derived_taxonomy_order: 'Order',
  derived_taxonomy_genus: 'Genus',
  length: 'Sequence Length',
};

export const fieldName = (field) => {
  return rowNames[field] || capitalize(field.replace('_', ' '));
};

export const rowHierarchy = [
  {
    name: 'Name Data',
    fields: [
      'name',
      'derived_segment_count',
      'id',
    ],
  },
  {
    name: 'Genome Data',
    fields: [
      'derived_baltimore',
      'nucleid_acid_structure',
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
      //'temperature',
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

//todo - should not be in flow of page (put it somewhere else)
const roughMeasure = (string) => {
  const div = document.createElement('span');
  div.className = 'BrowseTableSection-title';
  div.innerText = string;
  div.style.display = 'inline-block';
  document.body.appendChild(div);
  const dim = div.getBoundingClientRect();
  document.body.removeChild(div);
  return Math.floor(dim.width) + 1;
};

const extraPadding = 12;
export const rowSizes = Object.assign(rows.reduce((acc, row) => {
  return Object.assign(acc, {
    [row]: roughMeasure(fieldName(row)) + extraPadding,
  });
}, {}), {
  name: 300,
  capsid_morphology: 150,
  host: 200,
  derived_taxonomy_family: 120,
  derived_taxonomy_order: 120,
  derived_taxonomy_genus: 120,
});

export const headerColumnWidth = 96; //see css for table section

export const setRowSize = (field, width) => {
  Object.assign(rowSizes, { [field]: width });
};
