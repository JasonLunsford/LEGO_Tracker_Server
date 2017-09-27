const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const Elements = require('../models/elements');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	let query = req.query.q;
	let elements;

	// if (query) {
	// 	// leverage mongodb indexing to search targeted fields
	// 	elements = await Elements.find({$text: {$search: query}}).exec();
	// } else {
	// 	// no query passed, return all elements
	// 	elements = await Elements.find().exec();
	// }

	// if (elements.length === 0) {
	// 	res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
	// }

	// res.send(elements);

	if (query) {
		res.send(`NOT IMPLEMENTED: Elements GET, query string: ${query}`);
	}
	res.send('NOT IMPLEMENTED: Elements GET');
});

router.get('/:id', async (req, res) => {
	// let elementId = req.params.id;

	// if (!isValidId(elementId)) {
	// 	res.status(404).send({status: 404, msg: 'Id not found'});
	// }

	// let element = await Elements.findById(elementId).exec();

	// if (element === null) {
	// 	res.status(404).send({status: 404, msg: 'Id not found'});
	// } 

	// res.send(element);

	res.send(`NOT IMPLEMENTED: Element GET, ID: ${req.params.id}`);
});

router.post('/', async (req, res) => {
	if (req.body.payload) {
		let payload = JSON.parse(req.body.payload);
		res.send(`NOT IMPLEMENTED: Element POST, body: ${payload}`);
	}
	res.send('NOT IMPLEMENTED: Element POST');
});

module.exports = router;
