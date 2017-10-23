const express = require('express');
const router = express.Router();

const PieceCategories = require('../models/piece_categories');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let categories;
	let categoriesCount = 0;

	if (queryCount === 'true') {
		categoriesCount = await PieceCategories.find().count().exec();

		res.send({ count: categoriesCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			categories = await PieceCategories.find({$text: {$search: query}}).exec();
		} else {
			// no query passed, return all piece categories
			categories = await PieceCategories.find().exec();
		}

		if (categories.length === 0) {
			res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
		}

		res.send(categories);
	}
});

router.get('/:id', async (req, res) => {
	const pieceCatId = req.params.id;

	if (!isValidId(pieceCatId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let category = await PieceCategories.findById(pieceCatId).exec();

	if (category === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(category);
});

module.exports = router;
