let express = require("express");
let router = express.Router();

let PieceCategories = require('../models/piece_categories');

router.get('/', (req, res) => {
	PieceCategories.find((err, doc) => {
		res.send(doc);
	});
});

router.get('/:id', (req, res) => {
	let pieceCatId = req.params.id;

	PieceCategories.findById(pieceCatId, (err, doc) => {
		res.send(doc);
	});
});

module.exports = router;
