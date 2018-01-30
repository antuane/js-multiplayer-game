'use strict';

const Player = require('../modules/Player');

class PlayerService {

    constructor() {
        this._players = new Map;
    }

    getPlayer(id) {
        return this._players.get(id);
    }

    getPlayers() {
        return this._players.values();
    }

    addPlayer(id, name) {
        let player = new Player(id);
        this._players.set(player.id, player);
        return player;
    }

    removePlayer(playerId) {
        this._players.delete(playerId);
    }

    toJSON() {
        const response = [];
        this._players.forEach(player => {
            response.push(player.toJSON());
        });
        return response;
    }
    
}

module.exports = PlayerService;