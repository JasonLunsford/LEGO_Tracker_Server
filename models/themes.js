var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var ThemesSchema = new Schema({
	parent_name : { type: String, trim: true },
	set_count   : { type: Number, min: [0, 'Invalid set count'] },
	theme_name  : { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Themes', ThemesSchema, 'themes');
