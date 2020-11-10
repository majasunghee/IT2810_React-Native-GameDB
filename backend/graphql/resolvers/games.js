const Game = require("../../models/game");

const { transformGame } = require("./merge");

module.exports = {
  games: (args) => {
    return Game.find({
      name: { $regex: ".*" + args.name + ".*", $options: "i" },
    })
      .then((games) => {
        return games.map((game) => {
          return transformGame(game);
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};
