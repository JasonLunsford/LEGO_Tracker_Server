const express = require('express');
const router = express.Router();

const Themes = require('../models/themes');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	let query = req.query.q;
	let themes;

	if (query) {
		// leverage mongodb indexing to search targeted fields
		themes = await Themes.find({$text: {$search: query}}).exec();
	} else {
		// no query passed, return all themes
		themes = await Themes.find().exec();
	}

	if (themes.length === 0) {
		res.status(404).send([{status: 404, error: 'No results matching that search term'}]);
	}

	res.send(themes);
});

router.get('/:id', async (req, res) => {
	let themeId = req.params.id;

	if (!isValidId(themeId)) {
		res.status(404).send({status: 404, error: 'Id not found'});
	}

	let theme = await Themes.findById(themeId).exec();

	if (theme === null) {
		res.status(404).send({status: 404, error: 'Id not found'});
	} 

	res.send(theme);
});

module.exports = router;
