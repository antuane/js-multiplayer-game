
const GameEngine = require('./server/GameEngine');

const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);
const SERVER_PORT = process.env.PORT || 5001;

app.use('/static', express.static('client/static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

const gameEngine = new GameEngine();

app.set('port', SERVER_PORT);

server.listen(app.get('port'), () => {
    console.log('Express server listening on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});

gameEngine.listen(io);