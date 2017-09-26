const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// external data
let UrlsSchema = new Schema({
	source      : { type: String, lowercase: true, trim: true },
	url         : { type: String, lowercase: true, trim: true }
});

let SetPiecesSchema = new Schema({
	piece_id    : { type: Schema.ObjectId, ref: 'Pieces' },
	color_id    : { type: Schema.ObjectId, ref: 'Colors' }
});

let SetsSchema = new Schema({
	theme_id    : { type: Schema.ObjectId, required: true, ref: 'Themes' },
	year        : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	num_pieces  : { type: Number, min: [0, 'Invalid number of pieces'] },
	num_minifig : { type: Number, min: [0, 'Invalid number of mini-figures'] },
	set_num     : { type: String, required: true, lowercase: true, trim: true },
	name        : { type: String, required: true, lowercase: true, trim: true },
	set_img_urls: [UrlsSchema],
	build_urls  : [UrlsSchema],
	set_pieces  : [SetPiecesSchema]
});

// Indexing all fields of type String, referenced as text
SetsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Sets', SetsSchema, 'sets');
