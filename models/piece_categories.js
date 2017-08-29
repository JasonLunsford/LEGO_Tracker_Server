var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var PieceCategoriesSchema = new Schema({
	name          : { type: String, required: true, trim: true },
	piece_count   : { type: Number, min: [1, 'Invalid piece count'] },
	source        : { type: String, lowercase: true, trim: true }
});

module.exports = mongoose.model('PieceCategories', PieceCategoriesSchema, 'piece_categories');
