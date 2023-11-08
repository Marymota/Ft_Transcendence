import { useEffect, useState } from "react";
import { socket } from "../../App";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";
import { User, Message } from "../../types";

function sendMessage(content: string, sender: string, receiver: string) {
  socket.emit("sendMessage", {
    sender: sender,
    recipient: receiver,
    content: content,
  });
}

function ChatBox() {
  const currentUser = "amaria-m";
  const [users, setUsers] = useState<User[]>([]);
  const [channelSelected, setChannelSelected] = useState("");
  const [channelMessages, setChannelMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("entered users useEffect");
    const handleGetUsers = (data: User[]) => {
      console.log(`${data}`);
      setUsers(data);
    };
    socket.on("getUsers", handleGetUsers);
    socket.emit("getUsers");
    return () => {
      socket.off("getUsers", handleGetUsers);
    };
  }, []);

  function selectChannel(channelName: string) {
    const handleChannelMessages = (data: Message[]) => {
      setChannelMessages(data);
    };
    setChannelSelected(channelName);
    console.log(`selected channel: ${channelName}`);
    socket.on("getChannelMessages", handleChannelMessages);
    socket.emit("getChannelMessages", currentUser, channelSelected);
    socket.off("getChannelMessages", handleChannelMessages);
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
