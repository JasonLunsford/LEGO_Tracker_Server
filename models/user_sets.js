const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

let UserSetsSchema = new Schema({
	added    : { type: Date, default: Date.now },
	assembled: { type: Boolean, default: false },
	comments : { type: String, trim: true },
	deleted  : { type: Boolean, default: false },
	num_owned: { type: Number, min: [0, 'Invalid number of sets owned'] },
	rating   : { type: Number, min: 0, max: 5 },
	set_id   : { type: Object, required: true }
});

module.exports = mongoose.model('UserSets', UserSetsSchema, 'user_sets');
