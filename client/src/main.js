let GameController = require('./controllers/GameController')

if(window){
    const gameController = new GameController(window);
} else {
    throw new Error("Object window not found.")
}



// import { drawPoligon, drawPlayer } from './utils/canvas-util'




//     let canvas, context, socket, playerId, playerAction, world, config, ranking, gameEngine, socketEngine;

//     const PREDICTION = 6;

//     const playerImage = new Image(64, 64);
//     playerImage.src = '/static/img/player.png';
    
//     window.addEventListener("load", init, false);
//     window.addEventListener("resize", resize, false);

//     function init() {
        
//         canvas = document.getElementById('canvas');
//         if(canvas && "WebSocket" in window){
            
//             canvas.width  = window.innerWidth | document.body.clientWidth;;
//             canvas.height = window.innerHeight | document.body.clientHeight;;
//             context = canvas.getContext("2d");
//             socket = window.io.connect();
            
//             bindEvents();

//             const playerName = prompt("Digite seu Nick", "Guest");
            
//             socket.on('connect', function (data) {
//                 clearInterval(socketEngine);
//                 clearInterval(gameEngine);
//                 socket.emit('start-game', { name: playerName});
//             });

//             socket.on('player-connected', function (data) {
//                 config = data.config;
//                 playerId = data.player.id;
//                 playerAction.angle = data.player.angle;
//                 world = data.world;
//                 startGame();
//             });            

//             socket.on('update', function(data){
//                 playerId = data.player.id;
//                 world = data.world;
//                 ranking = data.ranking;
//             });
            
//         } else {
//             alert("Seu navegador não suporta WebSocket");
//         }
//     }

//     function resize(){
//         canvas.width  = window.innerWidth | document.body.clientWidth;;
//         canvas.height = window.innerHeight | document.body.clientHeight;;
//     }

//     function startGame() {       
//         gameEngine = setInterval(function(){
//             update();
//         }, 1000 / (config.FPS * PREDICTION));

//         socketEngine = setInterval(function(){
//             socket.emit('update', playerAction);
//         }, 1000 / (config.FPS));
//     }

//     function update() {

//         let diffX = 0;
//         let diffY = 0;

//         world.shots.forEach(shot => {
//             shot.x += (config.SHOT_VELOCITY / PREDICTION) * Math.cos((shot.angle) * (Math.PI / 180));
//             shot.y += (config.SHOT_VELOCITY / PREDICTION) * Math.sin((shot.angle) * (Math.PI / 180));
//         });

//         world.players.forEach(player => {
//             player.x += (player.velocity / PREDICTION) * Math.cos((player.angle) * (Math.PI / 180));
//             if(player.x > config.WORLD.width) player.x = 0;
//             else if(player.x < 0) player.x = config.WORLD.width;

//             player.y += (player.velocity / PREDICTION) * Math.sin((player.angle) * (Math.PI / 180));
//             if(player.y > config.WORLD.height) player.y = 0;
//             else if(player.y < 0) player.y = config.WORLD.height;

//             if(player.id == playerId) {

//                 if(playerAction.up){
//                     player.acceleration += config.PLAYER_ACCELERATION / PREDICTION;
//                     if (player.acceleration > config.PLAYER_MAX_VELOCITY) player.acceleration = config.PLAYER_MAX_VELOCITY;
//                 } 
                
//                 if (playerAction.down) {
//                     player.acceleration -= config.PLAYER_ACCELERATION / PREDICTION;
//                     if (player.acceleration < config.PLAYER_MIN_VELOCITY) player.acceleration = config.PLAYER_MIN_VELOCITY;
//                 }
    
//                 if (playerAction.left) {
//                     playerAction.angle -= 1;
//                     if (playerAction.angle < 0) playerAction.angle = 360;
//                 }
    
//                 if (playerAction.right) {
//                     playerAction.angle += 1;
//                     if (playerAction.angle > 360) playerAction.angle = 0;
//                 }

//                 let centerX = (canvas.width / 2);
//                 let centerY = (canvas.height / 2);

//                 diffX = centerX - player.x;
//                 diffY = centerY - player.y;
//             }
//         });



//         draw(diffX, diffY);

//     }

//     function draw(diffX, diffY){
//         if(world) {
//             context.clearRect (0 ,0 , canvas.width, canvas.height );
//             context.strokeStyle = "#222";
//             context.lineWidth = 3;
//             context.beginPath();
//             context.strokeRect(diffX, diffY, config.WORLD.width, config.WORLD.height);

//             const distanceLine = 50;

//             for (let index = 0; index < (config.WORLD.width / distanceLine); index++) {
//                 context.strokeRect(index * distanceLine + diffX, diffY, distanceLine, config.WORLD.height);
//                 context.strokeRect(diffX, index * distanceLine + diffY, config.WORLD.width, distanceLine);
//             }
//             context.stroke();

//             let centerX = (canvas.width / 2);
//             let centerY = (canvas.height / 2);

//             world.shots.forEach(shot => {
//                 const x = shot.x + diffX;
//                 const y = shot.y + diffY;

//                 context.fillStyle = shot.color;
//                 context.beginPath();
//                 context.arc(x,y,10,0,2*Math.PI);
//                 context.fill();
//             });

//             world.players.forEach(player => {
//                 if(player.live){
//                     const size = (player.width + player.height) / 2;
//                     const x = player.x + diffX;
//                     const y = player.y + diffY;
//                     drawPlayer(context, player, x, y);
//                     context.font = '10px Arial';
//                     context.textAlign = 'center';
//                     context.fillStyle = '#ffffff';
//                     context.fillText(player.name, player.x + diffX, player.y + (player.height * 2) + diffY);
//                 }
//             });

//             let rankBox = {
//                 width: 300,
//                 height: canvas.height - 20,
//                 x:canvas.width - (15 + 300),
//                 y: 10
//             }

//             context.fillStyle = "rgba(0,0,0,0.8)";
//             context.fillRect(rankBox.x, rankBox.y, rankBox.width, rankBox.height);

//             context.textAlign = 'left';
//             context.fillStyle = "#ffffff";
//             context.font = "20px Arial";
//             context.fillText("TOP RANKING: ",rankBox.x + 30,150);
//             context.font = "16px Arial";
//             if(ranking) {
//                 ranking.forEach((rank, i) => {
//                     context.fillText(i + " - " + rank.name + " ( " + rank.kills + " pts )",rankBox.x + 50,180 + (i*20));
//                 });
//             }
//         }
//         else{
//             console.error("world not found");
//         }
//     };

//     function bindEvents() {
//         playerAction = {
//             "up": false,
//             "left": false,
//             "right": false,
//             "down": false,
//             "atack": false,
//         };

//         function keyDownEvent (e) {
//             let keyCode = e.keyCode;

//             if(keyCode == 37 || keyCode == 65){
//                 playerAction.left = true;
//             }

//             if(keyCode == 39 || keyCode == 68){
//                 playerAction.right = true;
//             }

//             if(keyCode == 38 || keyCode == 87){
//                 playerAction.up = true;
//             }

//             if(keyCode == 40 || keyCode == 83){
//                 playerAction.down = true;
//             }

//             if(keyCode == 32){
//                 playerAction.fire = true;
//             }
//         };

//         function keyUpEvent (e) {
//             let keyCode = e.keyCode;

//             if(keyCode == 37 || keyCode == 65){
//                 playerAction.left = false;
//             }
            
//             if(keyCode == 39 || keyCode == 68){
//                 playerAction.right = false;
//             }

//             if(keyCode == 38 || keyCode == 87){
//                 playerAction.up = false;
//             }

//             if(keyCode == 40 || keyCode == 83){
//                 playerAction.down = false;
//             }

//             if(keyCode == 32){
//                 playerAction.fire = false;
//             }
//         };

//         document.addEventListener("keydown", keyDownEvent, false);
//         document.addEventListener("keyup", keyUpEvent, false);
//     }