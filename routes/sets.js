const express = require('express');
const router = express.Router();

const Sets = require('../models/sets');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	let query = req.query.q;
	// let s;

	// if (query) {
	// 	// leverage mongodb indexing to search targeted fields
	// 	s = await Sets.find({$text: {$search: query}}).exec();
	// } else {
	// 	// no query passed, return all sets
	// 	s = await Sets.find().exec();
	// }

	// if (s.length === 0) {
	// 	res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
	// }

	// res.send(s);

	if (query) {
		res.send(`NOT IMPLEMENTED: Sets GET, query string: ${query}`);
	}
	res.send('NOT IMPLEMENTED: Sets GET');
});

router.get('/:id', async (req, res) => {
	// let setId = req.params.id;

	// if (!isValidId(setId)) {
	// 	res.status(404).send({status: 404, msg: 'Id not found'});
	// }

	// let set = await Sets.findById(setId).exec();

	// if (set === null) {
	// 	res.status(404).send({status: 404, msg: 'Id not found'});
	// } 

	// res.send(set);

	res.send('NOT IMPLEMENTED: Set GET, ID: ' + req.params.id);
});

module.exports = router;
