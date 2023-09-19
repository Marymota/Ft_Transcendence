import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [rooms, setRooms] = useState<string[]>([]);
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
      console.log('created room : ', newRoomName);
      socket.emit('created room : ', newRoomName);
      setRooms([...rooms, newRoomName]);
    }
    setNewRoomName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRoomName]);

  const onClickSubmit = useCallback(() => {
    if (messageText.replace(/\s/g, '').length) {
      console.log(messageText);
      socket.emit('message', messageText);
    }
    setMessageText('');
  }, [messageText]);

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
            <h3>{'Channel: ' + roomName}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
