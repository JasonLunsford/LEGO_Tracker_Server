const express = require('express');
const router = express.Router();

const Sets = require('../models/sets');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let sets;
	let setsCount = 0;

	if (queryCount === 'true') {
		setsCount = await Sets.find().count().exec();

		res.send({ count: setsCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			sets = await Sets.find( { $text: { $search: query } } ).exec();
		} else {
			// no query passed, return all sets
			sets = await Sets.find().exec();
		}

		if (sets.length === 0) {
			res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
		}

		res.send(sets);
	}
});

router.get('/:id', async (req, res) => {
	let setId = req.params.id;

	if (!isValidId(setId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let set = await Sets.findById(setId).exec();

	if (set === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(set);
});

router.post('/', async (req, res) => {
	const payload = JSON.parse(req.body.payload);

	let newSet = new Sets({
		name        : payload.name,
		num_pieces  : payload.num_pieces,
		set_img_urls: payload.set_img_urls,
		set_num     : payload.set_num,
		theme_id    : mongoose.Types.ObjectId(payload.theme_id),
		year        : payload.year
	});

	newSet.save(err => {
		if (err) {
			res.status(422).send({
				status: 422, 
				msg: 'Save of ' + payload.name + ' failed.'
			});
		} else {
			res.status(200).send({
				status: 200, 
				msg: payload.name + ' saved successfully.'
			});
		}
	});
});

module.exports = router;
