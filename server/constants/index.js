'use strict';

const Config = {
    GAME: {
        FPS: 5,
        WORLD: {
            width:2000,
            height:2000
        },
        PLAYER_VELOCITY: 5,
        PLAYER_ACTION_INTERVAL: 200,
    },
    DATABASE: {
        MONGODB_URI : process.env.MONGODB_URI || 'mongodb://localhost/game',
    }
};

module.exports = Config;