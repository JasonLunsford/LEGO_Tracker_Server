let express = require("express");
let router = express.Router();

let Sets = require('../models/sets');

let isValidId = require ('../utils/utils');

router.get('/', (req, res) => {
	// Sets.find((err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Sets GET');
});

router.get('/:id', (req, res) => {
	// let setId = req.params.id;

	// if (!isValidId(setId)) {
	// 	res.status(500).send({status: 500, error: 'Invalid id'});
	// }

	// Sets.findById(setId, (err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Set GET, ID: ' + req.params.id);
});

module.exports = router;
