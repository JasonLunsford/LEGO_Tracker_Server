let express = require("express");
let router = express.Router();

let PieceCategories = require('../models/piece_categories');

let isValidId = require ('../utils/utils');

router.get('/', (req, res) => {
	PieceCategories.find((err, doc) => {
		res.send(doc);
	});
});

router.get('/:id', (req, res) => {
	let pieceCatId = req.params.id;

	if (!isValidId(pieceCatId)) {
		res.status(500).send({status: 500, error: 'Invalid id'});
	}

	PieceCategories.findById(pieceCatId, (err, doc) => {
		res.send(doc);
	});
});

module.exports = router;
