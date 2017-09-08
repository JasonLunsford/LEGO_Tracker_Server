let express = require("express");
let router = express.Router();

let Themes = require('../models/themes');

router.get('/', (req, res) => {
	Themes.find((err, doc) => {
		res.send(doc);
	});
});

router.get('/:id', (req, res) => {
	let themeId = req.params.id;

	Themes.findById(themeId, (err, doc) => {
		res.send(doc);
	});
});

module.exports = router;
