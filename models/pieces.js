const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* alternates: different pieces that serve same function, ex: friction v no friction
* molds: same piece, but mold variations over time to add flair, etc.
* piece_cat_id: the piece category ObjectId with which this piece is associated
* prints: decorative versions of the piece, typically w stickers or paint
***********/

// external data
let UrlsSchema = new Schema({
	source      : { type: String, lowercase: true, trim: true },
	url         : { type: String, lowercase: true, trim: true }
});

let PiecesSchema = new Schema({
	alternates  : [{ type: String, lowercase: true, trim: true }],
	molds       : [{ type: String, lowercase: true, trim: true }],
	name        : { type: String, required: true, lowercase: true, trim: true },
	piece_cat_id: { type: Object, required: true },
	piece_num   : { type: String, required: true, lowercase: true, trim: true },
	piece_urls  : [UrlsSchema],
	prints      : [{ type: String, lowercase: true, trim: true }],
	weight      : { type: String, lowercase: true, trim: true, default: '0.0g' },
	year_from   : { type: Number, min: [0, 'Invalid year'], max: [9999, 'Invalid year'] },
	year_to     : { type: Number, min: [0, 'Invalid year'], max: [9999, 'Invalid year'] }
});

// Indexing all fields of type String, referenced as text
PiecesSchema.index({'$**': 'text'});

module.exports = mongoose.model('Pieces', PiecesSchema, 'pieces');
