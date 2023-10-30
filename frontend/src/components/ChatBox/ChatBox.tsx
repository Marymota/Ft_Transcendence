import { socket } from "../../App";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";

function sendMessage(content: string, sender: string, receiver: string) {
  socket.emit("sendMsg", {
    content: content,
    sender: sender,
    receiver: receiver,
  });
}

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
            <input
              id="sendText"
              className="sendTextInput"
              placeholder="Write..."
            ></input>
            <button
              className="sendMessageButton"
              onClick={() => {
                console.log("test0");
                sendMessage(
                  (document.getElementById("sendText") as HTMLInputElement)
                    .value,
                  "amaria-m",
                  "pestevao"
                );
              }}
            >
              <div>Send</div> <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
