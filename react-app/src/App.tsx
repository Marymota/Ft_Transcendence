import React, { useState, useEffect } from 'react';
import StyledMessage from './components/StyleMessage';

function App() {
  console.log('begin');
  const [num, setNum] = useState(0);
  const [showFaceFlag, setShowFaceFlag] = useState(true);
  //   const onClickButton = () => alert("Button clicked");
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
  return (
    <>
      <h1>Hello World!</h1>
      <StyledMessage color="#00babc">{num} 42Lisbon : Lisbon</StyledMessage>
      <button onClick={onClickCountUp}>+1 :)</button>
      <button onClick={onClickSwitchFlag}>on / off</button>
      {showFaceFlag && <p> ^ ^</p>}
    </>
  );
}

export default App;
