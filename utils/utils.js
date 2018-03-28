isValidId = id => {
    return /[a-z0-9A-Z]{24,24}/.test(id);
};

//getDate = () => { return new Date().getTime(); }

module.exports = isValidId;
