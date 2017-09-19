let express = require("express");
let router = express.Router();

let UserSets = require('../models/user_sets');

let isValidId = require ('../utils/utils');

router.get('/', (req, res) => {
	// UserSets.find((err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: User Sets GET');
});

router.get('/:id', (req, res) => {
	// let userSetId = req.params.id;

	// if (!isValidId(userSetId)) {
	// 	res.status(500).send({status: 500, error: 'Invalid id'});
	// }

	// UserSets.findById(userSetId, (err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: User Set GET, ID: ' + req.params.id);
});

module.exports = router;
