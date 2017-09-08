let express = require("express");
let router = express.Router();

let Pieces = require('../models/pieces');

router.get('/', (req, res) => {
	// Pieces.find((err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Pieces GET');
});

router.get('/:id', (req, res) => {
	// let pieceId = req.params.id;

	// Pieces.findById(pieceId, (err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Piece GET, ID: ' + req.params.id);
});

module.exports = router;
