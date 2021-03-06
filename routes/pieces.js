const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const Pieces = require('../models/pieces');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let pieces;
	let piecesCount = 0;

	if (queryCount === 'true') {
		piecesCount = await Pieces.find().count().exec();

		res.send({ count: piecesCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			pieces = await Pieces.find( { $text: { $search: query } } ).exec();
		} else {
			// no query passed, return all pieces
			pieces = await Pieces.find().exec();
		}

		if (pieces.length === 0) {
			res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
		} else {
			res.send(pieces);
		}
	}
});

router.get('/:id', async (req, res) => {
	const pieceId = req.params.id;

	if (!isValidId(pieceId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let piece = await Pieces.findById(pieceId).exec();

	if (piece === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(piece);
});

router.post('/', async (req, res) => {
	const payload = JSON.parse(req.body.payload);

	let findPiece = await Pieces.findOne({'piece_num': payload.piece_num}).exec();

	if (findPiece) {
		res.status(418).send({status: 418, msg: 'Piece already exists.'});
	} else {
		let newPiece = new Pieces({
			alternates  : payload.alternates,
			molds       : payload.molds,
			name        : payload.name,
			piece_cat_id: mongoose.Types.ObjectId(payload.piece_cat_id),
			piece_num   : payload.piece_num,
			piece_urls  : payload.piece_urls,
			prints      : payload.prints,
			year_from   : payload.year_from,
			year_to     : payload.year_to
		});

		newPiece.save(err => {
			if (err) {
				res.status(422).send({
					status: 422, 
					msg: 'Save of ' + payload.name + ' failed.'
				});
			} else {
				res.status(200).send({
					status: 200, 
					msg: payload.name + ' saved successfully.'
				});
			}
		});
	}
});

router.put('/:id', async (req, res) => {
	const pieceId = req.params.id;
	const payload = JSON.parse(req.body.payload);
	
	Pieces.findByIdAndUpdate(
		pieceId,
		{
			$set: {
				alternates  : payload.alternates,
				molds       : payload.molds,
				prints      : payload.prints,
				year_from   : payload.year_from,
				year_to     : payload.year_to
			}
		},
		{
			new: true,
			runValidators: true
		})
	.exec((err, piece) => {
		if (err) {
			res.status(422).send({
				status: 422, 
				msg: 'Update of ' + payload.name + ' failed.',
				err
			});
		} else {
			res.status(200).send({
				status: 200, 
				msg: payload.name + ' saved successfully.',
				piece
			});
		}
	});
});

module.exports = router;
