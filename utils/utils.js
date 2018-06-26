
module.exports = {
    isValidId: id => /[a-z0-9A-Z]{24,24}/.test(id),
    cacheTimeout: 7200
}