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
	// 	res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
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
	// 	res.status(404).send({status: 404, msg: 'Id not found'});
	// }

	// let piece = await Pieces.findById(pieceId).exec();

	// if (piece === null) {
	// 	res.status(404).send({status: 404, msg: 'Id not found'});
	// } 

	// res.send(piece);

	res.send(`NOT IMPLEMENTED: Piece GET, ID: ${req.params.id}`);
});

router.post('/', async (req, res) => {
	let payload = JSON.parse(req.body.payload);

	let newPiece = new Pieces({
		piece_num     : payload.piece_num,
		element_num   : payload.element_num,
		year_from     : payload.year_from,
		year_to       : payload.year_to,
		name          : payload.name,
		weight        : payload.weight,
		piece_img_urls: payload.piece_img_urls,
		variations    : payload.variations,
		color_ids     : payload.color_ids
	});

	let findPiece = await Pieces.findOne({'piece_num': payload.piece_num}).exec();

	if (findPiece) {
		res.status(418).send({status: 418, msg: 'Piece already exists.'});
	}

	newPiece.save(err => {
		if (err) {
			res.status(422).send({status: 422, msg: 'Save failed.', err});
		} else {
			res.status(200).send({status:200, msg: 'Save successful.'});
		}
	});
});

module.exports = router;
