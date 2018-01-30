'use strict';

const CONSTANTS = require('../constants');
const PlayerService = require('./PlayerService');
const ShotService = require('./ChatService');

class GameService {

    constructor() {
        this._players = new PlayerService();
    }

    startGame(socket, data) {
        let player = this.playerService.addPlayer(socket.id, data.name);

        socket.emit(this.config.IO.OUTGOING.PLAYER_CONNECTED, { config: this.config, player: player.toJSON(), world: this.getWorld() });
    }

    actionPlayer(socket, action){

        let player = this.playerService.getPlayer(socket.id);

        
        if(player && action) {
            
            if(!player.live){
                socket.emit(this.config.IO.CONNECT, socket.id);
            }
            
            player.angle = action.angle;  
            

            const deltaTimeAction = Math.abs(new Date().getTime() - player.dateUpdateAction);

            if (deltaTimeAction > this.config.PLAYER_ACTION_MIN_INTERVAL) {

                if(action.up){
                    player.acceleration += this.config.PLAYER_ACCELERATION;
                    if (player.acceleration > this.config.PLAYER_MAX_VELOCITY) player.acceleration = this.config.PLAYER_MAX_VELOCITY;
                } else if (action.down) {
                    player.acceleration -= this.config.PLAYER_ACCELERATION;
                    if (player.acceleration < this.config.PLAYER_MIN_VELOCITY) player.acceleration = this.config.PLAYER_MIN_VELOCITY;
                }

                player.velocity = player.acceleration || 0;

                if (action.fire) {
                    const deltaTimeShot = Math.abs(new Date().getTime() - player.dateUpdateShot);
                    if (deltaTimeShot > this.config.SHOT_ACTION_MIN_INTERVAL) {
                        this.shotService.addShot(player);
                        player.dateUpdateShot = new Date().getTime();
                    }
                }

                player.dateUpdateAction = new Date().getTime();
            }
        
            socket.emit(this.config.IO.OUTGOING.UPDATE, { player: player, world: this.getWorld(), ranking: this.playerService.getRanking() });
        }

        for (let playerInList of this.playerService.getPlayers()) {
            if (socket.id == playerInList.id && !playerInList.live) {
                socket.emit(this.config.IO.INCOMING.START_GAME, socket.id);
                this.playerService.removePlayer(socket.id);
            }
        }
    }

    disconnectPlayer(socket) {
        this.playerService.removePlayer(socket.id);
    }

    update() {

        let listPlayers = this.playerService.getPlayers();
        let listShots = this.shotService.getShots();

        for (let shot of this.shotService.getShots()) {
            
            if (shot.live) {
                shot.x += this.config.SHOT_VELOCITY * Math.cos((shot.angle) * (Math.PI / 180));
                shot.y += this.config.SHOT_VELOCITY * Math.sin((shot.angle) * (Math.PI / 180));
            }

            if (!shot.live || shot.x < 0 || shot.x > this.config.WORLD.width || shot.y < 0 || shot.y > this.config.WORLD.height) {
                this.shotService.removeShot(shot.id);
            }
        }

        for (let player of this.playerService.getPlayers()) {
            if (player.live) {
                player.x += player.velocity * Math.cos((player.angle) * (Math.PI / 180));
                if(player.x > this.config.WORLD.width) player.x = 0;
                else if(player.x < 0) player.x = this.config.WORLD.width;

                player.y += player.velocity * Math.sin((player.angle) * (Math.PI / 180));
                if(player.y > this.config.WORLD.height) player.y = 0;
                else if(player.y < 0) player.y = this.config.WORLD.height;
            }
        }

        for (let shot of this.shotService.getShots()) {
            for (let player of this.playerService.getPlayers()) {
                if (player.testCollision(shot) && shot.player.id != player.id) {
                    let playerKiller = this.playerService.getPlayer(shot.player.id);
                    playerKiller.kill();
                    player.die();
                    shot.colide();
                    this.playerService.updatePlayer(player);
                    this.playerService.updatePlayer(playerKiller);
                }
            }
        }

        for (let shot of this.shotService.getShots()) {
            if (!shot.live || shot.x < 0 || shot.x > this.config.WORLD.width || shot.y < 0 || shot.y > this.config.WORLD.height) {
                this.shotService.removeShot(shot.id);
            }
        }

        
    }

    getWorld() {
        return {
            players: this.playerService.toJSON(),
            shots: this.shotService.toJSON(),
        }
    }
}

module.exports = GameService;