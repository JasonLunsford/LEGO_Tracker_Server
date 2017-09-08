let express = require("express");
let router = express.Router();

let Sets = require('../models/sets');

router.get('/', (req, res) => {
	// Sets.find((err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Sets GET');
});

router.get('/:id', (req, res) => {
	// let setId = req.params.id;

	// Sets.findById(setId, (err, doc) => {
	// 	res.send(doc);
	// });
	res.send('NOT IMPLEMENTED: Set GET, ID: ' + req.params.id);
});

module.exports = router;
