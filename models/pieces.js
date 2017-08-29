var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// external data
var UrlsSchema = new Schema({
	source        : { type: String, lowercase: true, trim: true },
	url           : { type: String, lowercase: true, trim: true }
});

var PiecesSchema = new Schema({
	piece_cat_id  : { type: Schema.ObjectId, required: true, ref: 'PieceCategories' },
	piece_num     : { type: Number, required: true, min: [0, 'Invalid piece number'] },
	element_num   : { type: Number, min: [0, 'Invalid element number'] },
	year_from     : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	year_to       : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	name          : { type: String, required: true, lowercase: true, trim: true },
	weight        : { type: String, lowercase: true, trim: true },
	piece_img_urls: [UrlsSchema],
	variations    : [{ type: Number, min: [0, 'Invalid piece number'] }],
	color_ids     : [{ type: Schema.ObjectId, ref: 'Colors' }]
});

module.exports = mongoose.model('Pieces', PiecesSchema, 'pieces');
