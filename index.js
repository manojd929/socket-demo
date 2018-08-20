const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(4000, () => {
  console.log('Server listening on 4000');
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {
  console.log('connection made', socket.id);

  // Handle chat event
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  // Handle typign event
  socket.on('typing', function(data) {
    // Every client except the one who is typing
    socket.broadcast.emit('typing', data);
  });

});
