'use strict';

class GameService {
    constructor(global) {
        
        this.socket = global.io.connect();
        this.socketId;
        this.config;
        this.listen();
    }

    listen() {

        this.socket.on('connected', data => {
            this.socketId = data.socketId;
            this.config = data.config;
            console.log('Player', data, 'connected!')
        });

        this.socket.on('started', data => {
            config = data.config;
            playerId = data.player.id;
            playerAction.angle = data.player.angle;
            world = data.world;
            startGame();
        });            

        this.socket.on('update', data => {
            playerId = data.player.id;
            world = data.world;
            ranking = data.ranking;
        });

    }

    start(name) {
        this.socket.emit('start', { name });
    }
}

module.exports = GameService;