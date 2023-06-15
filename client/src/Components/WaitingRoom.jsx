import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  useParams,
  Navigate,
} from 'react-router-dom';
import Game from '../Game';

// const socket = '';

export default function App() {
  const { roomName } = useParams();
  const [invalidRoom, setInvalidRoom] = useState(false);
  const [numofUser, setNumOfUser] = useState(0);
  const [role, setRole] = useState('');
  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('connection established');
    });
    socket.emit('joinRoom', roomName);
    socket.on('invalidRoom', () => {
      setInvalidRoom(true);
    });

    // ! Emit a event and listen to it for each

    socket.on('joinRoomSuccess', (role) => {
      setRole(role);
    });

    socket.on('roomUpdate', (users) => {
      console.log('Room Updated');
      setNumOfUser(users);
      if (users >= 2) setGameReady(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName]);

  return (
    <>
      {invalidRoom && <div> Invalid Room Name</div>}
      {gameReady && <Game />}
      {!invalidRoom && !gameReady && (
        <div>
          Hey There!, This is the Waiting room ${roomName} and is populated by $
          {numofUser} and has the role ${role}
        </div>
      )}
    </>
  );
}

/* 
Emit 'joinRoom' event with the room name
    socket.emit('joinRoom', roomName);

    Redirect to the room URL
    window.location.href = window.location.href + 'room/' + roomName;
    */
