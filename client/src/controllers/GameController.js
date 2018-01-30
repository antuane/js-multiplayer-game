'use strict';

let GameService = require('../services/GameService'); 

class GameController {
    constructor(global){

        console.log(global);
        if(!(global.HTMLCanvasElement && global.WebSocket)){
            throw new Error('O navegador não suporta!');
        }

        let $ = document.querySelector.bind(document);
        this._canvas = $('#canvas');
        this.gameService = new GameService(global);
        this._init();
    }

    _init() {

        let loadingGame = setInterval(() => {
            if(this.gameService.config){
                this._run();
                clearInterval(loadingGame);
            }
        }, 200);
    }

    _run() {

        let config = this.gameService.config;        
        setInterval(() => {
            //this.gameService.update();
            console.log("Loop start");
        }, 1000 / config.FPS);
    }
}

module.exports = GameController