import { useState } from "react";
import "./ChatBox.css";
import ChannelButtons from "./ChannelButtons/ChannelButtons";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ChatBox() {
  const currentUser = "amaria-m";
  const [selectedChannel, setSelectedChannel] = useState("");
  const [test, setTest] = useState(0);

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="group-names">
            <ChannelButtons
              currentUser={currentUser}
              getSelectedChannel={setSelectedChannel}
            />
          </div>
        </div>
        <div className="chatDisplay">
          {/* <div className="messagesBox">
            {selectedChannel != "" &&
            chats[selectedChannel - 1].history.length > 0 ? (
              chats[selectedChannel - 1].history
                .slice(0)
                .reverse()
                .map((msg: IMessage) => {
                  let userId = 0;
                  chats[selectedChannel - 1].members.map((user) => {
                    if (user.userName == currentUser) userId = user.id;
                  });
                  if (msg.senderId == userId) {
                    return (
                      <div key={msg.id} className="message sentMessage">
                        <div className="messageBuble sentBuble">
                          {msg.content}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={msg.id} className="message receivedMessage">
                        <div className="messageBuble receivedBuble">
                          {msg.content}
                        </div>
                      </div>
                    );
                  }
                })
            ) : (
              <p>You have no messages</p>
            )}
          </div> */}
          <div className="writeBox">
            <input
              id="sendText"
              className="sendTextInput"
              placeholder="Write..."
            ></input>
            <button
              className="sendMessageButton"
              onClick={() => {
                setTest(test + 1);
              }}
            >
              <div>Send</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
