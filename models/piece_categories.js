let mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// external data
let ExternalIdSchema = new Schema({
	cat_id      : { type: Number, min: [0, 'Invalid piece category id'] },
	source      : { type: String, lowercase: true, trim: true }
});

let PieceCategoriesSchema = new Schema({
	name        : { type: String, required: true, trim: true },
	piece_count : { type: Number, min: [1, 'Invalid piece count'] },
	external_ids: [ExternalIdSchema]
});

module.exports = mongoose.model('PieceCategories', PieceCategoriesSchema, 'piece_categories');
