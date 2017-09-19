let express = require("express");
let router = express.Router();

let Pieces = require('../models/pieces');

let isValidId = require ('../utils/utils');

router.get('/', (req, res) => {
	// Pieces.find((err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Pieces GET');
});

router.get('/:id', (req, res) => {
	// let pieceId = req.params.id;

	// if (!isValidId(pieceId)) {
	// 	res.status(500).send({status: 500, error: 'Invalid id'});
	// }

	// Pieces.findById(pieceId, (err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Piece GET, ID: ' + req.params.id);
});

module.exports = router;
