import { useEffect, useState } from "react";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";
import {
  getChatsFromServer,
  getUsersFromServer,
} from "../../dataVars/serverRequests";
import { useRecoilState } from "recoil";
import { chatsAtom, usersAtom } from "../../dataVars/atoms";
import { IChat, IMessage, IUser } from "../../dataVars/types";

// function sendMessage(content: string, sender: string, receiver: string) {

// }

function ChatBox() {
  const currentUser = "amaria-m";
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [users, setUsers] = useRecoilState(usersAtom);
  const [chats, setChats] = useRecoilState(chatsAtom);

  useEffect(() => {
    getUsersFromServer().then((value) => {
      setUsers(value);
    });
    getChatsFromServer().then((value) => {
      setChats(value);
    });
  }, []);

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="group-names">
            {chats.length > 0 ? (
              chats.map((chat: IChat) => {
                if (chat.type == "group") {
                  return (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChannel(chat.id);
                      }}
                      className={
                        "groupName " +
                        (selectedChannel == chat.id && "selectedChannelStyle")
                      }
                    >
                      {chat.chatName}
                    </div>
                  );
                } else {
                  let name = "";
                  chat.members.map((user: IUser) => {
                    if (user.userName != currentUser) name = user.userName;
                  });
                  return (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChannel(chat.id);
                      }}
                      className={
                        "groupName " +
                        (selectedChannel == chat.id && "selectedChannelStyle")
                      }
                    >
                      {name}
                    </div>
                  );
                }
              })
            ) : (
              <p>No Conversations</p>
            )}
          </div>
        </div>
        <div className="chatDisplay">
          <div className="messagesBox">
            {selectedChannel > 0 &&
            chats[selectedChannel - 1].history.length > 0 ? (
              chats[selectedChannel - 1].history.map((msg: IMessage) => {
                if (msg.Sender.userName == currentUser) {
                  return (
                    <div className="message sentMessage">{msg.content}</div>
                  );
                } else {
                  return (
                    <div className="message receivedMessage">{msg.content}</div>
                  );
                }
              })
            ) : (
              <p>You have no messages</p>
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
              // onClick={() => {
              //   sendMessage(
              //     (document.getElementById("sendText") as HTMLInputElement)
              //       .value,
              //     currentUser,
              //     selectedChannel
              //   );
              // }}
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
