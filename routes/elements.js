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

	let findElement = await Elements.findOne({'element_num': payload.element_num}).exec();

	if (findElement) {
		res.status(418).send({status: 418, msg: 'Element already exists.'});
	} else {
		let newElement = new Elements({
			color_id    : mongoose.Types.ObjectId(payload.color_id),
			element_num : payload.element_num,
			element_urls: payload.element_urls,
			num_sets    : payload.num_sets,
			piece_id    : mongoose.Types.ObjectId(payload.piece_id),
			price       : payload.price,
			num_usage   : payload.num_usage
		});

		newElement.save(err => {
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
	}
});

module.exports = router;
