import { useEffect, useState } from "react";
import { socket } from "../../App";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";

type Message = {
  id: number;
  content: string | null;
  senderId: number;
  recepientId: number;
  Recepient: User;
  Sender: User;
};

type User = {
  id: number;
  firstName: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  MessagesReceived: Message[];
  MessagesSent: Message[];
};

function sendMessage(content: string, sender: string, receiver: string) {
  socket.emit("sendMessage", {
    sender: sender,
    recipient: receiver,
    content: content,
  });
}

function callGetUsers() {
  socket.emit("getUsers");
}

function ChatBox() {
  const currentUser = "amaria-m";
  const [users, setUsers] = useState<User[]>([]);
  const [channelSelected, setChannelSelected] = useState("");
  const [channelMessages, setChannelMessages] = useState<Message[]>([]);

  socket.on("getUsers", (data) => {
    console.log(`${data}`);
    setUsers(data);
  });
  useEffect(() => {
    callGetUsers();
    const intervalId = setInterval(callGetUsers, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    socket.on("getChannelMessages", (data) => {
      const messagesData: Message[] = data;
      setChannelMessages(messagesData);
    });
  }, []);

  useEffect(() => {
    socket.emit("getChannelMessages", currentUser, channelSelected);
  }, [channelSelected]);

  function selectChannel(channelName: string) {
    console.log(`selected channel: ${channelName}`);
    setChannelSelected(channelName);
  }

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="group-names">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  onClick={() => {
                    selectChannel(user.userName);
                  }}
                  className={
                    "groupName group1 " +
                    (channelSelected == user.userName && "selectedChannelStyle")
                  }
                  key={user.id}
                >
                  {user.userName}
                </div>
              ))
            ) : (
              <p>No Users</p>
            )}
          </div>
        </div>
        <div className="chatDisplay">
          <div className="messagesBox">
            {channelMessages.length > 0 ? (
              channelMessages.map((msg) => (
                <div className="message receivedMessage">
                  <div className="messageBuble receivedBuble">
                    {msg.content}
                  </div>
                </div>
              ))
            ) : (
              <p>No Messages</p>
            )}
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
                  currentUser,
                  channelSelected
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
