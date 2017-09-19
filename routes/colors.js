let express = require("express");
let router = express.Router();

let Colors = require('../models/colors');

let isValidId = require ('../utils/utils');

router.get('/', (req, res) => {
	Colors.find((err, doc) => {
		res.send(doc);
	});
});

router.get('/:id', (req, res) => {
	let colorId = req.params.id;

	if (!isValidId(colorId)) {
		res.status(500).send({status: 500, error: 'Invalid id'});
	}

	Colors.findById(colorId, (err, doc) => {
		res.send(doc);
	});
});

module.exports = router;
