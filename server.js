var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

var server = http.createServer(app);

var io = require('socket.io')(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));

var messages = [{
	author: "Carlos",
    text: "Hola! que tal?"
},{
	author: "Pepe",
    text: "Muy bien! y tu??"
},{
	author: "Paco",
    text: "Genial!"
}];

io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');

  console.log(socket.id);
    socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});


var port =process.env.PORT || '8000';
app.set('port', port);
server.listen(port);
