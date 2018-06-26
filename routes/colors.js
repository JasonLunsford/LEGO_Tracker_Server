const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const router = express.Router();

const Colors = require('../models/colors');

const Utils = require ('../utils/utils');

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
            result = await Colors.find( { $text: { $search: query } } ).exec();

            Utils.serveRequest(res, result);
        } else {
            // leverage Redis (redis-serve runs in background) for memcaching
            client.get('allColors', (err, result) => {
                if (result) {
                    Utils.serveRequest(res, result);
                } else {
                    Colors.find().exec().then(result => {
                        client.setex('allColors', Utils.cacheTimeout, JSON.stringify(result));

                        Utils.serveRequest(res, result);
                    });
                }
            });
        }
    }
});

router.get('/:id', async (req, res) => {
    const colorId = req.params.id;

    if (!Utils.isValidId(colorId)) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    let color = await Colors.findById(colorId).exec();

    if (color === null) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    res.send(color);
});

module.exports = router;
