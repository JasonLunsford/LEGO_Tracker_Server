const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* color_id: the lego_tracker ID of the color associated w the element
* element_num: the element number
* element_urls: an array containing one or more images of this element, w source
* num_sets: the total number of sets this piece appears in
* piece_id: the lego_tracker ID of the piece this element is a version of
* price: the average cost of this element (???)
* num_usage: the total number of times this element is used (may/not match num_sets)
***********/

// external data
let UrlsSchema = new Schema({
	source      : { type: String, lowercase: true, trim: true },
	url         : { type: String, lowercase: true, trim: true }
});

let ElementsSchema = new Schema({
	color_id    : { type: Object },
	element_num : { type: String, lowercase: true, trim: true },
	element_urls: [UrlsSchema],
	num_sets    : { type: Number, min: [0, 'Invalid number of sets'] },
	piece_id    : { type: Object, required: true },
	price       : { type: String, lowercase: true, trim: true, default: '$0.00' },
	num_usage   : { type: Number, min: [0, 'Invalid number of times used'] }
});

// Indexing all fields of type String, referenced as text
ElementsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Elements', ElementsSchema, 'elements');
