const express = require('express');
const router = express.Router();

const UserSets = require('../models/user_sets');

const isValidId = require ('../utils/utils');

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
            userSets = await UserSets.find({$text: {$search: query}}).exec();
        } else {
            // no query passed, return all user sets
            userSets = await UserSets.find().exec();
        }

        // if (userSets.length === 0) {
        //     res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
        // }

        res.send(userSets);
    }
});

router.get('/:id', async (req, res) => {
    const userSetId = req.params.id;

    if (!isValidId(userSetId)) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    let useSet = await UserSets.findById(userSetId).exec();

    if (useSet === null) {
        res.status(404).send({status: 404, msg: 'Id not found'});
    }

    res.send(useSet);
});

module.exports = router;
