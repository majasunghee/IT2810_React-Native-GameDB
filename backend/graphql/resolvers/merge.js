const transformGame = game => {
    return {
        ...game._doc, 
        _id: game.id, 
        creator: user.bind(this, game.creator)
    };
}

exports.transformGame = transformGame;

