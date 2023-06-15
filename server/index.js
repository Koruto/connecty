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

const rooms = new Map();

io.on('connection', (socket) => {
  // ...
  console.log(`User Joined with Id: ${socket.id}`);
  socket.on('add_tile', (columnIndex) => {
    console.log('Event Received');
    io.emit('add_til', columnIndex);
  });

  socket.on('createRoom', (roomName) => {
    const room = { ['0']: 'default' };
    // Add the room to the map
    rooms.set(roomName, room);
    console.log(rooms);
  });

  socket.on('joinRoom', (roomName) => {
    // Check if the room already exists in the map
    if (rooms.has(roomName)) {
      // Retrieve the room object
      socket.join(roomName);
      const room = rooms.get(roomName);
      const numOfUserInRoom = Object.keys(room).length;
      const clientId = socket.id;
      const role = numOfUserInRoom <= 2 ? 'Player' : 'Spectator';

      // Add the client to the room with the specified role
      console.log(roomName, clientId, role, numOfUserInRoom);
      room[clientId] = role;
      // Update the room in the map
      rooms.set(roomName, room);

      // Emit a success message to the client
      socket.emit('joinRoomSuccess', role);
      io.to(roomName).emit('roomUpdate', numOfUserInRoom);

      // Broadcast the updated room data to all clients in the room
      console.log(`User joined room: ${roomName}`);
      // Join the room
      console.log(rooms);
    } else {
      // Create a new room object with the client and role
      socket.emit('invalidRoom');
    }
  });

  socket.on('disconnect', () => {
    console.log(`A user disconnected ${socket.id}`);
    rooms.forEach((room, roomName) => {
      if (room[socket.id]) {
        // Remove the client from the room
        delete room[socket.id];
        rooms.set(roomName, room);
        if (Object.keys(room).length == 1) rooms.delete(roomName);
        // Update the room in the map
        console.log(rooms);
        return;
      }
    });
  });
});

httpServer.listen(3000);
