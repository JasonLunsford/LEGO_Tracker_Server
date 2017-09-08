let mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// external data
let ExternalIdSchema = new Schema({
	theme_id    : { type: Number, min: [0, 'Invalid theme id'] },
	source      : { type: String, lowercase: true, trim: true }
});

let ThemesSchema = new Schema({
	name        : { type: String, required: true, trim: true },
	parent_name : { type: String, trim: true },
	parent_id   : { type: Object },
	set_count   : { type: Number, min: [0, 'Invalid set count'] },
	external_ids: [ExternalIdSchema]
});

module.exports = mongoose.model('Themes', ThemesSchema, 'themes');
