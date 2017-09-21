const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(500).send({status: 500, error: 'Invalid endpoint'});
});

module.exports = router;
