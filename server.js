var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));


var port =process.env.PORT || '8000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
