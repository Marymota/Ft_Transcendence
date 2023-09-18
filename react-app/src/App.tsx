import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import StyledMessage from './components/StyleMessage';

const socket = io('http://localhost:3000');

function App() {
  console.log('begin');
  const [num, setNum] = useState(0);
  const [showFaceFlag, setShowFaceFlag] = useState(true);
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const [roomID, setRoomID] = useState('');

  const onClickCountUp = () => {
    setNum(num + 1);
  };
  const onClickSwitchFlag = () => {
    setShowFaceFlag(!showFaceFlag);
  };
  useEffect(() => {
    if (num % 3 === 0 && !showFaceFlag) setShowFaceFlag(true);
    else if (showFaceFlag) setShowFaceFlag(false);
    else if (num % 3 !== 0 && showFaceFlag) setShowFaceFlag(false);
  }, [num]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connection ID : ', socket.id);
    });
  }, []);

  const onClickSubmit = useCallback(() => {
    console.log(inputText);
    socket.emit('message', inputText);
  }, [inputText]);

  socket.on('update', (message: string) => {
    console.log('received : ', message);
  });

  useEffect(() => {
    socket.on('update', (message: string) => {
      console.log('recieved : ', message);
      setMsg(message);
    });
  }, []);

  useEffect(() => {
    setChatLog([...chatLog, msg]);
  }, [msg]);

  return (
    <>
      <h1>Hello World!</h1>
      <StyledMessage color="#00babc">{num} 42Lisbon : Lisbon</StyledMessage>
      <button onClick={onClickCountUp}>+1 :)</button>
      <button onClick={onClickSwitchFlag}>on / off</button>
      {showFaceFlag && <p> ^ ^</p>}
      <input id="inputText" type="text" />
      <select
        onChange={(event) => {
          setRoomID(event.target.value);
          socket.emit('joinRoom', event.target.value);
          setChatLog([]);
        }}
        value={roomID}
      >
        <option value="">---</option>
        <option value="room1">Room1</option>
        <option value="room2">Room2</option>
      </select>
      <input
        id="inputText"
        type="text"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      />
      <input id="sendButton" onClick={onClickSubmit} type="submit" />
      {chatLog.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  );
}

export default App;
