let express = require("express");
let router = express.Router();

router.get('/', (req, res) => {
	res.send('Not a valid endpoint');
});

module.exports = router;
