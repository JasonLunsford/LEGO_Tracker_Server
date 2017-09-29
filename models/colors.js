const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* is_trans: is a transparent or translucent piece, aka not a solid color
* rgb: color value in hex format
***********/

// external data
let ExternalIdSchema = new Schema({
	color_id    : { type: Number, min: [0, 'Invalid color id'] },
	source      : { type: String, lowercase: true, trim: true }
});

let ColorsSchema = new Schema({
	external_ids: [ExternalIdSchema],
	is_trans    : { type: Boolean, default: false },
	name        : { type: String, required: true, trim: true },
	rgb         : { type: String, required: true, lowercase: true, trim: true }
});

// Indexing all fields of type String, referenced as text
ColorsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Colors', ColorsSchema, 'colors');
