
module.exports = {
    isValidId: id => /[a-z0-9A-Z]{24,24}/.test(id),
    cacheTimeout: 7200,
    serveRequest: (res, items) => {
        if (items.length === 0) {
            res.status(404).send([{status: 404, msg: 'No results matching that search term'}]);
        }

        res.send(items);
    }
}