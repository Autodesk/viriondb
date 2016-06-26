export const rows = [
'name',
'accession',
'description',
'derived_baltimore',
'amino_acid_structure',
'nucleic_acid_shape',
'sequenced_mol',
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
'taxonomy'
];

//otherwise, just uppsercase it
export const rowNames = {
	accession: 'Accession Number',
	amino_acid_structure: 'Amino Acid Structure',
	derived_baltimore: 'Baltimore Group',
	derived_sense: 'Sense',
	nucleic_acid_shape: 'Nucleid Acid Shape',
	sequenced_mol: 'Nucleid Acid Strandedness',
	derived_protein_count: 'Protein Number',
	capsid_morphology: 'Capsid Morphology',
	capsid_envelope: 'Capsid Envelope',
	taxonomy: 'Host Taxonomy',
	derived_taxonomy_family: 'Family',
	derived_taxonomy_order: 'Order',
	derived_taxonomy_genus: 'Genus',
};
