const express = require('express');
const router = express.Router();

const Colors = require('../models/colors');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	let query = req.query.q;
	let colors;

	if (query) {
		// leverage mongodb indexing to search targeted fields
		colors = await Colors.find({$text: {$search: query}}).exec();
	} else {
		// no query passed, return all colors
		colors = await Colors.find().exec();
	}

	if (colors.length === 0) {
		res.status(404).send([{status: 404, error: 'No results matching that search term'}]);
	}

	res.send(colors);
});

router.get('/:id', async (req, res) => {
	let colorId = req.params.id;

	if (!isValidId(colorId)) {
		res.status(404).send({status: 404, error: 'Id not found'});
	}

	let color = await Colors.findById(colorId).exec();

	if (color === null) {
		res.status(404).send({status: 404, error: 'Id not found'});
	} 

	res.send(color);
});

module.exports = router;
