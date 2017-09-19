isValidId = id => {
	return /[a-z0-9A-Z]{24,24}/.test(id);
};

module.exports = isValidId;
