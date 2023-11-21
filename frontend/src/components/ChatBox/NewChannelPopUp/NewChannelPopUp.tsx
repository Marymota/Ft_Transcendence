import { useState } from "react";
import "./NewChannelPopUp.css";

export default function NewChannelPopUp() {
  const [title, setTitle] = useState("channel");
  return (
    <div className="newChannelPopUp">
      <div className="popUpHeader">
        <div
          className="title1"
          onClick={() => {
            setTitle("title1");
          }}
        >
          Private Message
        </div>
        <div
          className="title2"
          onClick={() => {
            setTitle("title2");
          }}
        >
          New Channel
        </div>
      </div>
    </div>
  );
}
