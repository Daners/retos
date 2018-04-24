var socket = io.connect('http://localhost:8000', { 'forceNew': true });

socket.on('messages', function(data) {
	console.log(data);
});

function addMessage(mess) {
	var mensaje = {
    author:mess.username,
    text: mess.val
  };

  socket.emit('new-message', mensaje);
  return false;
}
