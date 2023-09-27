import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import './App.css';
import Jogo from './components/jogo';

const socket = io('http://localhost:3000');

function App() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentChatLog, setCurrentChatLog] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connection ID : ', socket.id);
    });
  }, []);

  const onClickCreateRoom = useCallback(() => {
    if (
      rooms.indexOf(newRoomName) < 0 &&
      newRoomName.replace(/\s/g, '').length
    ) {
      console.log('createRoom', newRoomName);
      socket.emit('createRoom', newRoomName);
      setRooms([...rooms, newRoomName]);
    }
    setNewRoomName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRoomName]);

  const onClickSubmit = useCallback(() => {
    if (messageText.replace(/\s/g, '').length) {
      console.log(messageText);
      socket.emit('message', messageText, roomID);
    }
    setMessageText('');
  }, [messageText]);

  socket.on('update', (chatLog: []) => {
    setCurrentChatLog(chatLog);
  });

  return (
    <>
      <div className="roomCreationSection">
        <input
          id="newRoomName"
          type="text"
          value={newRoomName}
          onChange={(event) => {
            setNewRoomName(event.target.value);
          }}
        />
        <input
          id="newRoom"
          onClick={onClickCreateRoom}
          type="submit"
          value="Create Room"
        />
      </div>

      <div className="sendMessageSection">
        <select
          onChange={(event) => {
            setRoomID(event.target.value);
            socket.emit('joinRoom', event.target.value);
          }}
          value={roomID}
        >
          <option value="">---</option>
          {rooms.map((name, index) => (
            <option value={index}>{name}</option>
          ))}
        </select>
        <input
          id="inputText"
          type="text"
          value={messageText}
          onChange={(event) => {
            setMessageText(event.target.value);
          }}
        />
        <input
          id="sendButton"
          onClick={onClickSubmit}
          type="submit"
          value="Send"
        />
      </div>
      <div className="roomBoards">
        {rooms.map((roomName, index) => (
          <div className="roomBoard" key={index}>
            <h3>Channell: {roomName}</h3>
            {currentChatLog.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        ))}
      </div>
      <Jogo player1='pedro' player2='antonio'></Jogo>
    </>
  );
}

export default App;
