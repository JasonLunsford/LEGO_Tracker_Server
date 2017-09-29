const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* piece_count: number of pieces belonging to this category
***********/

// external data
let ExternalIdSchema = new Schema({
	cat_id      : { type: Number, min: [0, 'Invalid piece category id'] },
	source      : { type: String, lowercase: true, trim: true }
});

let PieceCategoriesSchema = new Schema({
	external_ids: [ExternalIdSchema],
	name        : { type: String, required: true, trim: true },
	piece_count : { type: Number, min: [1, 'Invalid piece count'] }
});

// Indexing all fields of type String, referenced as text
PieceCategoriesSchema.index({'$**': 'text'});

module.exports = mongoose.model('PieceCategories', PieceCategoriesSchema, 'piece_categories');
