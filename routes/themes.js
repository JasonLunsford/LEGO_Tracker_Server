const express = require('express');
const router = express.Router();

const Themes = require('../models/themes');

const isValidId = require ('../utils/utils');

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
			themes = await Themes.find({$text: {$search: query}}).exec();
		} else {
			// no query passed, return all themes
			themes = await Themes.find().exec();
		}

		if (themes.length === 0) {
			res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
		}

		res.send(themes);
	}
});

router.get('/:id', async (req, res) => {
	const themeId = req.params.id;

	if (!isValidId(themeId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let theme = await Themes.findById(themeId).exec();

	if (theme === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(theme);
});

module.exports = router;
