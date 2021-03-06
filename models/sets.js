const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* alt_set_nums: alternate set numbers for the same EXACT set
* build_urls: collection of set build instructions possible with this specific set
* has_gear: flag if the set includes non-LEGO piece stuff like water bottles, frisbees, etc
* members: other sets belonging to this set (if this array populated set is now a collection)
* num_minifig: the number of mini-figures found in this set, if any
* num_pieces: the number of NON SPARE pieces
* num_spares: the number of SPARE peices
* set_pieces: either get an element_id OR a piece_id/color_id, depending on whether the piece
*             (is likely) a piece of minifigure. Minifigs pieces DO NOT have element_ids.
***********/

// array schemas
let SetPiecesSchema = new Schema({
	color_id     : { type: Object, default: null },
	element_id   : { type: Object, default: null },
	is_spare     : { type: Boolean, default: false },
	piece_id     : { type: Object, default: null },
	quantity     : { type: Number, min: [0, 'Invalid quantity number'] }
});

let UrlsSchema = new Schema({
	source       : { type: String, lowercase: true, trim: true },
	url          : { type: String, lowercase: true, trim: true }
});

// main schema
let SetsSchema = new Schema({
	alt_set_nums : [{ type: Object }],
	build_urls   : [UrlsSchema],
	has_gear     : { type: Boolean, default: false },
	name         : { type: String, required: true, lowercase: true, trim: true },
	members      : [{ type: Object }],
	num_minifig  : { type: Number, min: [0, 'Invalid number of mini-figures'], default: 0 },
	num_pieces   : { type: Number, min: [0, 'Invalid number of pieces'] },
	num_spares   : { type: Number, default: 0 },
	set_img_urls : [UrlsSchema],
	set_num      : { type: String, required: true, lowercase: true, trim: true },
	set_pieces   : [SetPiecesSchema],
	theme_id     : { type: Object, required: true },
	year         : { type: Number, min: [1958, 'Invalid year'], max: [9999, 'Invalid year'] }
});

// Indexing all fields of type String, referenced as text
SetsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Sets', SetsSchema, 'sets');
