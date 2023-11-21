import { useState } from "react";
import "./NewChannelPopUp.css";
import NewChannelPage from "./newChannelPage/newChannelPage";
import NewPrivateMessage from "./newPrivateMessage/newPrivateMessage";

interface Props {
  popUp: (n: number) => void;
}

export default function NewChannelPopUp({ popUp }: Props) {
  const [title, setTitle] = useState("title1");
  return (
    <div
      className={
        "newChannelPopUp " +
        (title == "title1" && "title1Selected") +
        " " +
        (title == "title2" && "title2Selected")
      }
    >
      <div className="popUpHeader">
        <div
          className="headerTitle title1"
          onClick={() => {
            setTitle("title1");
          }}
        >
          Private Message
        </div>
        <div
          className="headerTitle title2"
          onClick={() => {
            setTitle("title2");
          }}
        >
          New Channel
        </div>
      </div>
      {title == "title2" && <NewChannelPage />}
      {title == "title1" && <NewPrivateMessage />}
      <div
        className="cancelButton"
        onClick={() => {
          popUp(0);
        }}
      >
        CANCEL
      </div>
    </div>
  );
}
