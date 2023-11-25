import { useState } from "react";
import "./ChatBox.css";
import ChannelButtons from "./ChannelButtons/ChannelButtons";
import SendDiv from "./MessageBox/sendDiv/SendDiv";
import MessageBox from "./MessageBox/MessageBox";
import NewChannelPopUp from "./NewChannelPopUp/NewChannelPopUp";

function ChatBox() {
  const currentUser = "amaria-m";
  const [selectedChannel, setSelectedChannel] = useState("");
  const [popUp, setPopUp] = useState(0);

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
          <ChannelButtons
            currentUser={currentUser}
            getSelectedChannel={setSelectedChannel}
          />
        </div>
        <div className="chatDisplay">
          <div className="messagesBox">
            <MessageBox
              currentUser={currentUser}
              selectedChannel={selectedChannel}
            />
          </div>
          <SendDiv id="sendText" />
        </div>
      </div>
      {popUp && <NewChannelPopUp popUp={setPopUp} currentUser={currentUser} />}
    </>
  );
}

export default ChatBox;
