const express = require('express');
const router = express.Router();

const Colors = require('../models/colors');

const isValidId = require ('../utils/utils');

router.get('/', async (req, res) => {
    const query = req.query.q;
    const queryCount = req.query.count;
    let colors;
    let colorsCount = 0;

    if (queryCount === 'true') {
        colorsCount = await Colors.find().count().exec();

        res.send({ count: colorsCount });
    } else {
        if (query) {
            // leverage mongodb indexing to search targeted fields
            colors = await Colors.find({$text: {$search: query}}).exec();
        } else {
            // no query passed, return all colors
            colors = await Colors.find().exec();
        }

        if (colors.length === 0) {
            res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
        }

        res.send(colors);
    }
});

router.get('/:id', async (req, res) => {
    const colorId = req.params.id;

    if (!isValidId(colorId)) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    let color = await Colors.findById(colorId).exec();

    if (color === null) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    res.send(color);
});

module.exports = router;
