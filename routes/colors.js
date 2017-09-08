let express = require("express");
let router = express.Router();

let Colors = require('../models/colors');

router.get('/', (req, res) => {
	Colors.find((err, doc) => {
		res.send(doc);
	});
});

router.get('/:id', (req, res) => {
	let colorId = req.params.id;

	Colors.findById(colorId, (err, doc) => {
		res.send(doc);
	});
});

module.exports = router;
