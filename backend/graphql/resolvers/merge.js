const transformGame = game => {
    return {
        ...game._doc, 
        _id: game.id
    };
}

exports.transformGame = transformGame;

