const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// external data
let ExternalIdSchema = new Schema({
	source      : { type: String, lowercase: true, trim: true },
	theme_id    : { type: Number, min: [0, 'Invalid theme id'] }
});

let ThemesSchema = new Schema({
	external_ids: [ExternalIdSchema],
	name        : { type: String, required: true, trim: true },
	parent_id   : { type: Object },
	parent_name : { type: String, trim: true },
	set_count   : { type: Number, min: [0, 'Invalid set count'] }
});

// Indexing all fields of type String, referenced as text
ThemesSchema.index({'$**': 'text'});

module.exports = mongoose.model('Themes', ThemesSchema, 'themes');
