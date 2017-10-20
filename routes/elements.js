const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const Elements = require('../models/elements');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let elements;
	let elementsCount = 0;

	if (queryCount === 'true') {
		elementsCount = await Elements.find().count().exec();

		res.send({ count: elementsCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			elements = await Elements.find( { $text: { $search: query } } ).exec();
		} else {
			// no query passed, return all elements
			elements = await Elements.find().exec();
		}

		if (elements.length === 0) {
			res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
		}

		res.send(elements);
	}
});

router.get('/:id', async (req, res) => {
	let elementId = req.params.id;

	if (!isValidId(elementId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let element = await Elements.findById(elementId).exec();

	if (element === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(element);
});

router.post('/', async (req, res) => {
	const payload = JSON.parse(req.body.payload);

	let newElement = new Elements({
		color_id    : mongoose.Types.ObjectId(payload.color_id),
		element_num : payload.element_num,
		element_urls: payload.element_urls,
		num_sets    : payload.num_sets,
		num_usage   : payload.num_usage,
		piece_id    : mongoose.Types.ObjectId(payload.piece_id)
	});

	newElement.save(err => {
		let name = payload.element_num || 'Nameless One';
		if (err) {
			res.status(422).send({
				status: 422, 
				msg: 'Save of ' + name + ' failed.'
			});
		} else {
			res.status(200).send({
				status: 200, 
				msg: name + ' saved successfully.'
			});
		}
	});
});

module.exports = router;
