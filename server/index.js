import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://127.0.0.1:5173'],
  },
});

io.on('connection', (socket) => {
  // ...
  console.log(`User Joined with Id: ${socket.id}`);
  socket.on('add_tile', (columnIndex) => {
    console.log('Event Received');
    io.emit('add_til', columnIndex);
  });
});

httpServer.listen(3000);
