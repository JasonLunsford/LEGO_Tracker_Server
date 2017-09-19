let express = require("express");
let router = express.Router();

let Themes = require('../models/themes');

let isValidId = require ('../utils/utils');

router.get('/', (req, res) => {
	Themes.find((err, doc) => {
		res.send(doc);
	});
});

router.get('/id/:id', (req, res) => {
	let themeId = req.params.id;

	if (!isValidId(themeId)) {
		res.status(404).send({status: 404, error: 'Id not found'});
	}

	Themes.findById(themeId, (err, doc) => {
		// need to handle no document found case, use same error message
		res.send(doc);
	});
});

router.get('/name/:name', (req, res) => {
	let themeName = req.params.name;

	// need error handling util method, regEx should not be too strict

	Themes.find({name: themeName}, (err, doc) => {
		// need to handle no document found case
		res.send(doc);
	});
});

// add more endpoints for parent id and parent name

module.exports = router;
