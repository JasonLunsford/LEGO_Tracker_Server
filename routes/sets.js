const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const router = express.Router();

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const Sets = require('../models/sets');

const isValidId = require ('../utils/utils');

const serveRequest = (res, items) => {
	if (items.length === 0) {
		res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
	}

	res.send(items);
}

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let sets;
	let setsCount = 0;

	if (queryCount === 'true') {
		setsCount = await Sets.find().count().exec();

		res.send({ count: setsCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			result = await Sets.find( { $text: { $search: query } } ).exec();

			serveRequest(res, result);
		} else {
			// leverage Redis (redis-serve runs in background) for memcaching
			client.get('allSets', (err, result) => {
				if (result) {
					serveRequest(res, result);
				} else {
					Sets.find().exec().then(result => {
						client.setex('allSets', 3600, JSON.stringify(result));

						serveRequest(res, result);
					});
				}
			});
		}
	}
});

router.get('/:id', async (req, res) => {
	let setId = req.params.id;

	if (!isValidId(setId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let set = await Sets.findById(setId).exec();

	if (set === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(set);
});

router.post('/', async (req, res) => {
	const payload = JSON.parse(req.body.payload);

	let findSet = await Sets.findOne({'set_num': payload.set_num}).exec();

	if (findSet) {
		res.status(418).send({status: 418, msg: 'Set already exists.'});
	} else {
		let newSet = new Sets({
			name        : payload.name,
			num_pieces  : payload.num_pieces,
			set_img_urls: payload.set_img_urls,
			set_num     : payload.set_num,
			theme_id    : mongoose.Types.ObjectId(payload.theme_id),
			year        : payload.year
		});

		newSet.save(err => {
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
	const setId = req.params.id;
	const payload = JSON.parse(req.body.payload);

	const set_pieces = payload.set_pieces.map(piece => {
		let color_id = (piece.color_id) ? mongoose.Types.ObjectId(piece.color_id) : null;
		let element_id = (piece.element_id) ? mongoose.Types.ObjectId(piece.element_id) : null;

		return {
			color_id,
			element_id,
			is_spare : piece.is_spare,
			piece_id : mongoose.Types.ObjectId(piece.piece_id),
			quantity : piece.quantity
		};
	});
	
	Sets.findByIdAndUpdate(
		setId,
		{
			$set: {
				num_pieces : payload.num_pieces,
				num_spares : payload.num_spares,
				set_pieces
			}
		},
		{
			new: true,
			runValidators: true
		})
	.exec((err, set) => {
		if (err) {
			res.status(422).send({
				status: 422, 
				msg: 'Update failed.',
				err
			});
		} else {
			res.status(200).send({
				status: 200, 
				msg: 'Save successful.',
				set
			});
		}
	});
});

module.exports = router;
