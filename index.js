
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected with id: ', socket.id);
  
  
  socket.on('disconnect', () => {
    console.log('User disconnected with id: ', socket.id);
  });

  const rooms = io.sockets.adapter.rooms;
  console.log('List of rooms:', rooms);

  socket.on('sendMessage', (msg) => {
    console.log(msg);
    socket.to('room-name').emit("receiveMessage", msg)
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server listening on *:3001');
});
