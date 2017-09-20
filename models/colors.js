const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// external data
let ExternalIdSchema = new Schema({
	color_id    : { type: Number, min: [0, 'Invalid color id'] },
	source      : { type: String, lowercase: true, trim: true }
});

let ColorsSchema = new Schema({
	name        : { type: String, required: true, trim: true },
	rgb         : { type: String, required: true, lowercase: true, trim: true },
	is_trans    : { type: Boolean, default: false },
	external_ids: [ExternalIdSchema]
});

// Indexing all fields of type String, referenced as text
ColorsSchema.index({'$**': 'text'});

module.exports = mongoose.model('Colors', ColorsSchema, 'colors');
