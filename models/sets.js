const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* build_urls: collection of set build instructions possible with this specific set
* num_minifig: the number of mini-figures found in this set, if any
***********/

// external data
let UrlsSchema = new Schema({
	source      : { type: String, lowercase: true, trim: true },
	url         : { type: String, lowercase: true, trim: true }
});

let SetPiecesSchema = new Schema({
	element_id  : { type: Object },
	is_spare    : { type: Boolean, default: false },
	quantity    : { type: Number, min: [0, 'Invalid quantity number'] }
});

let SetsSchema = new Schema({
	build_urls  : [UrlsSchema],
	name        : { type: String, required: true, lowercase: true, trim: true },
	num_minifig : { type: Number, min: [0, 'Invalid number of mini-figures'], default: 0 },
	num_pieces  : { type: Number, min: [0, 'Invalid number of pieces'] },
	set_img_urls: [UrlsSchema],
	set_num     : { type: String, required: true, lowercase: true, trim: true },
	set_pieces  : [SetPiecesSchema],
	theme_id    : { type: Object, required: true },
	year        : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] }
});

// Indexing all fields of type String, referenced as text
SetsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Sets', SetsSchema, 'sets');
