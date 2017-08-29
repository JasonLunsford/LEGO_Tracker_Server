var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// external data
var UrlsSchema = new Schema({
	source        : { type: String, lowercase: true, trim: true },
	url           : { type: String, lowercase: true, trim: true }
});

var SetPiecesSchema = new Schema({
	piece_id      : { type: Schema.ObjectId, ref: 'Pieces' },
	color_id      : { type: Schema.ObjectId, ref: 'Colors' }
});

var SetsSchema = new Schema({
	theme_id      : { type: Schema.ObjectId, required: true, ref: 'Themes' },
	year          : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] },
	piece_num     : { type: Number, min: [0, 'Invalid piece number'] },
	minifig_num   : { type: Number, min: [0, 'Invalid number of mini-figures'] },
	set_num       : { type: String, required: true, lowercase: true, trim: true },
	name          : { type: String, required: true, lowercase: true, trim: true },
	set_img_urls  : [UrlsSchema],
	build_urls    : [UrlsSchema],
	set_pieces    : [SetPiecesSchema]
});

module.exports = mongoose.model('Sets', SetsSchema, 'sets');
