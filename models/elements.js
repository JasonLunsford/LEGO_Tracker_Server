const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// external data
let UrlsSchema = new Schema({
	source      : { type: String, lowercase: true, trim: true },
	url         : { type: String, lowercase: true, trim: true }
});

let ElementsSchema = new Schema({
	color_id    : { type: Object, required: true },
	element_num : { type: String, required: true, lowercase: true, trim: true },
	element_urls: [UrlsSchema],
	num_sets    : { type: Number, min: [0, 'Invalid number of sets'] },
	part_id     : { type: Object, required: true },
	price       : { type: String, lowercase: true, trim: true, default: '$0.00' }
});

// Indexing all fields of type String, referenced as text
ElementsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Elements', ElementsSchema, 'elements');
