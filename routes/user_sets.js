let express = require("express");
let router = express.Router();

let UserSets = require('../models/user_sets');

router.get('/', (req, res) => {
	// UserSets.find((err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: User Sets GET');
});

router.get('/:id', (req, res) => {
	// let userSetId = req.params.id;

	// UserSets.findById(userSetId, (err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: User Set GET, ID: ' + req.params.id);
});

module.exports = router;
