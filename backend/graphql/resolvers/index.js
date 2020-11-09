const gamesResolver = require('./games');

const rootResolver = {
    ...gamesResolver
};

module.exports = rootResolver;