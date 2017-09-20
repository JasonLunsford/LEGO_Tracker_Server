const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

let UserSetsSchema = new Schema({
	set_id   : { type: Schema.ObjectId, required: true, ref: 'Sets' },
	owned_num: { type: Number, min: [0, 'Invalid owned number'] },
	rating   : { type: Number, min: 0, max: 5 },
	comments : { type: String, trim: true },
	assembled: { type: Boolean, default: false },
	added    : { type: Date, default: Date.now },
	deleted  : { type: Boolean, default: false }
});

module.exports = mongoose.model('UserSets', UserSetsSchema, 'user_sets');
