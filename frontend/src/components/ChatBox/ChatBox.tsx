import "./ChatBox.css";

function ChatBox() {
  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="group-names">
            <div className="groupName group1">Paulo</div>
            <div className="groupName group2">Antonio</div>
            <div className="groupName group3">Simao</div>
            <div className="groupName group4">Pedro</div>
            <div className="groupName group5">Andre</div>
          </div>
        </div>
        <div className="chatDisplay">
          <div className="messagesBox">
            <div className="message sentMessage">
              <div className="messageBuble sentBuble">Ola</div>
            </div>
            <div className="message receivedMessage">
              <div className="messageBuble receivedBuble">Adeus</div>
            </div>
          </div>
          <div className="writeBox">
            <input className="sendTextInput" placeholder="Write..."></input>
            <button className="sendMessageButton">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
