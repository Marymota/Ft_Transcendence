import { useState } from "react";
import "./ChatBox.css";
import ChannelButtons from "./ChannelButtons/ChannelButtons";
import SendDiv from "./MessageBox/sendDiv/SendDiv";
import MessageBox from "./MessageBox/MessageBox";

function ChatBox() {
  const currentUser = "amaria-m";
  const [selectedChannel, setSelectedChannel] = useState("");

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="newChannelButton">New +</div>
          <div className="group-names">
            <ChannelButtons
              currentUser={currentUser}
              getSelectedChannel={setSelectedChannel}
            />
          </div>
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
    </>
  );
}

export default ChatBox;
