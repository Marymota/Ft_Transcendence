import { useEffect, useState } from "react";
import "./ChatBox.css";
import ChannelButtons from "./ChannelButtons/ChannelButtons";
import SendDiv from "./MessageBox/sendDiv/SendDiv";
import MessageBox from "./MessageBox/MessageBox";
import NewChannelPopUp from "./NewChannelPopUp/NewChannelPopUp";

function ChatBox() {
  const currentUser = "amaria-m";
  const [popUp, setPopUp] = useState(0);

  useEffect(() => {
    return () => void console.log("recycling chatBox");
  }, []);

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div
            className="newChannelButton"
            onClick={() => {
              setPopUp(1);
            }}
          >
            New +
          </div>
          <ChannelButtons currentUser={currentUser} />
        </div>
        <div className="chatDisplay">
          <MessageBox currentUser={currentUser} />
          <SendDiv id="sendText" />
        </div>
      </div>
      {popUp && <NewChannelPopUp popUp={setPopUp} currentUser={currentUser} />}
    </>
  );
}

export default ChatBox;
