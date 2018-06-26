const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const router = express.Router();

const PieceCategories = require('../models/piece_categories');

const Utils = require ('../utils/utils');

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
			result = await PieceCategories.find( { $text: { $search: query } } ).exec();

			Utils.serveRequest(res, result);
		} else {
			// leverage Redis (redis-serve runs in background) for memcaching
			client.get('allPieceCategories', (err, result) => {
				if (result) {
					Utils.serveRequest(res, result);
				} else {
					PieceCategories.find().exec().then(result => {
						client.setex('allPieceCategories', Utils.cacheTimeout, JSON.stringify(result));

						Utils.serveRequest(res, result);
					});
				}
			});
		}
	}
});

router.get('/:id', async (req, res) => {
	const pieceCatId = req.params.id;

	if (!Utils.isValidId(pieceCatId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let category = await PieceCategories.findById(pieceCatId).exec();

	if (category === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(category);
});

module.exports = router;
