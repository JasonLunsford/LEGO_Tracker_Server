const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// external data
let UrlsSchema = new Schema({
	source        : { type: String, lowercase: true, trim: true },
	url           : { type: String, lowercase: true, trim: true }
});

let PiecesSchema = new Schema({
	piece_cat_id  : { type: Schema.ObjectId, required: true, ref: 'PieceCategories' },
	piece_num     : { type: String, required: true, lowercase: true, trim: true },
	element_num   : { type: String, lowercase: true, trim: true },
	year_from     : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	year_to       : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	name          : { type: String, required: true, lowercase: true, trim: true },
	weight        : { type: String, lowercase: true, trim: true, default: '0g' },
	piece_img_urls: [UrlsSchema],
	variations    : [{ type: String, min: [0, 'Invalid piece number'] }],
	color_ids     : [{ type: Schema.ObjectId, ref: 'Colors' }]
});

// Indexing all fields of type String, referenced as text
PiecesSchema.index({
	name: 'text',
	piece_num: 'text',
	element_num: 'text',
	weight: 'text'
});

module.exports = mongoose.model('Pieces', PiecesSchema, 'pieces');
