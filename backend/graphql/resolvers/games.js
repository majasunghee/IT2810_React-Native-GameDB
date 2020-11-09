const Game = require("../../models/game");
const User = require("../../models/user");

const { user } = require("./merge");
const { transformGame } = require("./merge");

// regex for å søker
// .where() .or()

//let filters = {};

/*
filters).or(
            {name: { $regex: ".*" + params.Keys + ".*", '$options': 'i'}}
        )
*/

//let søk = "pokémon"
//let skip = 10;

module.exports = {
  games: (args) => {
    return Game.find({
      name: { $regex: ".*" + args.name + ".*", $options: "i" },
    })
      .skip((args.skip-1)*6)
      .limit(6)
      .then((games) => {
        return games.map((game) => {
          return transformGame(game);
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  createGame: (args, req) => {
    //       if (!req.isAuth) {
    //           throw new Error('Unathenticated');
    //       }
    const game = new Game({
      name: args.gameInput.name,
      platform: args.gameInput.platform,
      msrp: +args.gameInput.msrp,
      publisher: args.gameInput.publisher,
      developer: args.gameInput.developer,
      esrb: args.gameInput.esrb,
      releasedate: args.gameInput.releasedate,
      romfilesize: args.gameInput.romfilesize,
      genre: args.gameInput.genre,
      storelink: args.gameInput.storelink,
      officialsite: args.gameInput.officialsite,
      creator: req.userId,
    });
    let createdGame;
    return game
      .save()
      .then((result) => {
        createdGame = {
          ...result._doc,
          _id: result._doc._id.toString(),
          creator: user.bind(this, result._doc.creator),
        };
        return User.findById("5f988f451e74b11f5ca7b092");
      })
      .then((user) => {
        if (!user) {
          throw new Error("User not found.");
        }
        user.createdGames.push(game);
        return user.save();
      })
      .then((result) => {
        return createdGame;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
