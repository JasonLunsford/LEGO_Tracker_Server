const express = require('express');
const router = express.Router();

const UserSets = require('../models/user_sets');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
	let query = req.query.q;
	// let userSets;

	// if (query) {
	// 	// leverage mongodb indexing to search targeted fields
	// 	userSets = await UserSets.find({$text: {$search: query}}).exec();
	// } else {
	// 	// no query passed, return all user sets
	// 	userSets = await UserSets.find().exec();
	// }

	// if (userSets.length === 0) {
	// 	res.status(404).send([{status: 404, error: 'No results matching that search term'}]);
	// }

	// res.send(userSets);

	if (query) {
		res.send(`NOT IMPLEMENTED: User Sets GET, query string: ${query}`);
	}
	res.send('NOT IMPLEMENTED: User Sets GET');
});

router.get('/:id', async (req, res) => {
	// let userSetId = req.params.id;

	// if (!isValidId(userSetId)) {
	// 	res.status(404).send({status: 404, error: 'Id not found'});
	// }

	// let userSet = await UserSets.findById(userSetId).exec();

	// if (userSet === null) {
	// 	res.status(404).send({status: 404, error: 'Id not found'});
	// } 

	// res.send(userSet);

	res.send(`NOT IMPLEMENTED: User Set GET, ID: ${req.params.id}`);
});

module.exports = router;
