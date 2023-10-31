import { useEffect, useState } from "react";
import { socket } from "../../App";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";

type Message = {
  id: number;
  content: string | null;
  recepientId: number;
  Recepient: User;
};

type User = {
  id: number;
  firstName: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  Messages: Message[]; // You might need to define the Message type as well
};

function sendMessage(content: string, sender: string, receiver: string) {
  socket.emit("sendMessage", {
    sender: sender,
    recipient: receiver,
    content: content,
  });
}

function ChatBox() {
  const [users, setUsers] = useState<User[]>([]);
  socket.emit("getUsers");

  useEffect(() => {
    socket.on("getUsers", (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="group-names">
            {users.length > 0 ? (
              users.map((user) => (
                <div className="groupName group1" key={user.id}>
                  {user.userName}
                </div>
              ))
            ) : (
              <p>no users</p>
            )}
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
            <div className="message receivedMessage">
              <div className="messageBuble receivedBuble">
                <button onClick={() => {}}>Ask</button>
              </div>
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
