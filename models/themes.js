var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var ThemesSchema = new Schema({
	name  		: { type: String, required: true, trim: true },
	parent_name : { type: String, trim: true },
	parent_id   : { type: String, default: 0 },
	set_count   : { type: Number, min: [0, 'Invalid set count'] }
});

module.exports = mongoose.model('Themes', ThemesSchema, 'themes');
