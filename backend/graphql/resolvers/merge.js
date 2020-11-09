const User = require('../../models/user');
const Game = require('../../models/game');


const user = userId => {
    return User.findById(userId)
    .then( user => {
        return {
            ...user._doc, 
            _id: user.id,
            createdGames: games.bind(this, user._doc.createdGames)
        };
    })
    .catch ( err => {
        throw err;
    })
};

const games = gameIDs => {
    Game.find({_id: {$in: gameIDs}})
       .then(games => {
           return games.map(game => {
               return transformGame(game);
           });
       })
       .catch (err => {
           throw err;
       })
};

const transformGame = game => {
    return {
        ...game._doc, 
        _id: game.id, 
        creator: user.bind(this, game.creator)
    };
}

exports.transformGame = transformGame;
exports.user = user;
//exports.games = games;