const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const router = express.Router();

const Themes = require('../models/themes');

const Utils = require ('../utils/utils');

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let themes;
	let themesCount = 0;

	if (queryCount === 'true') {
		themesCount = await Themes.find().count().exec();

		res.send({ count: themesCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			result = await Themes.find( { $text: { $search: query } } ).exec();

			Utils.serveRequest(res, result);
		} else {
			// leverage Redis (redis-serve runs in background) for memcaching
			client.get('allThemes', (err, result) => {
				if (result) {
					Utils.serveRequest(res, result);
				} else {
					Themes.find().exec().then(result => {
						client.setex('allThemes', Utils.cacheTimeout, JSON.stringify(result));

						Utils.serveRequest(res, result);
					});
				}
			});
		}
	}
});

router.get('/:id', async (req, res) => {
	const themeId = req.params.id;

	if (!Utils.isValidId(themeId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let theme = await Themes.findById(themeId).exec();

	if (theme === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(theme);
});

module.exports = router;
