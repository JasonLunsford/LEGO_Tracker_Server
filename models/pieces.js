const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// external data
let ElementsSchema = new Schema({
	element_num   : { type: String, lowercase: true, trim: true },
	color_id      : { type: Object },
	url           : { type: String, lowercase: true, trim: true }
});

let PiecesSchema = new Schema({
	piece_cat_id  : { type: Object, required: true },
	piece_num     : { type: String, required: true, lowercase: true, trim: true },
	year_from     : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	year_to       : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	name          : { type: String, required: true, lowercase: true, trim: true },
	weight        : { type: String, lowercase: true, trim: true, default: '0g' },
	variations    : [{ type: String, min: [0, 'Invalid piece number'] }],
	elements      : [ElementsSchema]
});

// Indexing all fields of type String, referenced as text
PiecesSchema.index({'$**': 'text'});

module.exports = mongoose.model('Pieces', PiecesSchema, 'pieces');
