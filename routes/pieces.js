const express = require('express');
const router = express.Router();

const Pieces = require('../models/pieces');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	let query = req.query.q;
	// let pieces;

	// if (query) {
	// 	// leverage mongodb indexing to search targeted fields
	// 	pieces = await Pieces.find({$text: {$search: query}}).exec();
	// } else {
	// 	// no query passed, return all pieces
	// 	pieces = await Pieces.find().exec();
	// }

	// if (pieces.length === 0) {
	// 	res.status(404).send([{status: 404, error: 'No results matching that search term'}]);
	// }

	// res.send(pieces);

	if (query) {
		res.send(`NOT IMPLEMENTED: Pieces GET, query string: ${query}`);
	}
	res.send('NOT IMPLEMENTED: Pieces GET');
});

router.get('/:id', async (req, res) => {
	// let pieceId = req.params.id;

	// if (!isValidId(pieceId)) {
	// 	res.status(404).send({status: 404, error: 'Id not found'});
	// }

	// let piece = await Pieces.findById(pieceId).exec();

	// if (piece === null) {
	// 	res.status(404).send({status: 404, error: 'Id not found'});
	// } 

	// res.send(piece);

	res.send(`NOT IMPLEMENTED: Piece GET, ID: ${req.params.id}`);
});

router.post('/', async (req, res) => {
	// create a Piece mongoose instance
	// run findOne using that instance to determine if piece exists
	// write a callback (within this route) to run in the .exec()
	// callback will redirect (if piece exists) or saves
	res.send({msg: 'thank you'});
});

module.exports = router;
