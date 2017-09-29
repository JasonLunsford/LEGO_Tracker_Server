const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

/***********
* Field Definitions:
*
* rating: a rating value, maybe star based?
* deleted: will register a set as deleted, but will not actually delete set from db
* comments: user supplied comments about the set
* assembled: whether the set is or has been assembled...i guess?
***********/

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
