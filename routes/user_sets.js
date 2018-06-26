const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const router = express.Router();

const UserSets = require('../models/user_sets');

const Utils = require ('../utils/utils');

const serveRequest = (res, items) => {
    if (items.length === 0) {
        // Commented to prevent 404 - No user sets in db yet
        // res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
    }

    res.send(items);
}

router.get('/', async (req, res) => {
    const query = req.query.q;
    const queryCount = req.query.count;
    let userSets;
    let userSetsCount = 0;

    if (queryCount === 'true') {
        userSetsCount = await UserSets.find().count().exec();

        res.send({ count: userSetsCount });
    } else {
        if (query) {
            // leverage mongodb indexing to search targeted fields
            result = await UserSets.find( { $text: { $search: query } } ).exec();

            serveRequest(res, result);
        } else {
            // leverage Redis (redis-serve runs in background) for memcaching
            client.get('allUserSets', (err, result) => {
                if (result) {
                    serveRequest(res, result);
                } else {
                    UserSets.find().exec().then(result => {
                        client.setex('allUserSets', Utils.cacheTimeout, JSON.stringify(result));

                        serveRequest(res, result);
                    });
                }
            });
        }
    }
});

router.get('/:id', async (req, res) => {
    const userSetId = req.params.id;

    if (!Utils.isValidId(userSetId)) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    let useSet = await UserSets.findById(userSetId).exec();

    if (useSet === null) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    res.send(useSet);
});

module.exports = router;
