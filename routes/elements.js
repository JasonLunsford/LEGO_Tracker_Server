const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const router = express.Router();

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const Elements = require('../models/elements');

const Utils = require ('../utils/utils');

const serveRequest = (res, items) => {
	if (items.length === 0) {
		res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
	}

	res.send(items);
}

router.get('/', async (req, res) => {
	const query = req.query.q;
	const queryCount = req.query.count;
	let elements;
	let elementsCount = 0;

	if (queryCount === 'true') {
		elementsCount = await Elements.find().count().exec();

		res.send({ count: elementsCount });
	} else {
		if (query) {
			// leverage mongodb indexing to search targeted fields
			result = await Elements.find( { $text: { $search: query } } ).exec();

			serveRequest(res, result);
		} else {
			// leverage Redis (redis-serve runs in background) for memcaching
			client.get('allElements', (err, result) => {
				if (result) {
					serveRequest(res, result);
				} else {
					Elements.find().exec().then(result => {
						client.setex('allElements', Utils.cacheTimeout, JSON.stringify(result));

						serveRequest(res, result);
					});
				}
			});
		}
	}
});

router.get('/:id', async (req, res) => {
	let elementId = req.params.id;

	if (!Utils.isValidId(elementId)) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	}

	let element = await Elements.findById(elementId).exec();

	if (element === null) {
		res.status(404).send({status: 404, msg: 'Id not found'});
	} 

	res.send(element);
});

router.post('/', async (req, res) => {
	const payload = JSON.parse(req.body.payload);

	let newElement = new Elements({
		color_id    : mongoose.Types.ObjectId(payload.color_id),
		element_num : payload.element_num,
		element_urls: payload.element_urls,
		num_sets    : payload.num_sets,
		num_usage   : payload.num_usage,
		piece_id    : mongoose.Types.ObjectId(payload.piece_id)
	});

	newElement.save(err => {
		let name = payload.element_num || 'Nameless One';
		if (err) {
			res.status(422).send({
				status: 422, 
				msg: 'Save of ' + name + ' failed.'
			});
		} else {
			res.status(200).send({
				status: 200, 
				msg: name + ' saved successfully.'
			});
		}
	});
});

router.put('/:id', async (req, res) => {
	const elementId = req.params.id;
	const payload = JSON.parse(req.body.payload);

	Elements.findByIdAndUpdate(
		elementId,
		{
			$set: {
				color_id    : mongoose.Types.ObjectId(payload.color_id),
				element_num : payload.element_num,
				num_sets    : payload.num_sets,
				price       : payload.price,
				num_usage   : payload.num_usage
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

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = router;
