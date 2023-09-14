import React from "react";
import StyledMessage from "./components/StyleMessage";

function App() {
  const onClickButton = () => alert("Button clicked");
  return (
    <>
      <h1>Hello World!</h1>
      <StyledMessage color="#00babc" message="42Lisbon : Lisbon" />
      <button onClick={onClickButton}>Click Here :)</button>
    </>
  );
}

export default App;
