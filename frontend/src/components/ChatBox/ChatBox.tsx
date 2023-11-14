import { useEffect, useState } from "react";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";
import {
  addMsgToDataBase,
  getChatsFromServer,
} from "../../dataVars/serverRequests";
import { useRecoilState } from "recoil";
import { chatsAtom } from "../../dataVars/atoms";
import { IChat, IMessage, IUser } from "../../dataVars/types";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ChatBox() {
  const currentUser = "amaria-m";
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [chats, setChats] = useRecoilState(chatsAtom);
  const [test, setTest] = useState(0);

  useEffect(() => {
    getChatsFromServer().then((value) => {
      setChats(value);
    });
  }, [selectedChannel, test]);

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
                addMsgToDataBase(
                  selectedChannel,
                  currentUser,
                  (document.getElementById("sendText") as HTMLInputElement)
                    .value
                );
                setTest(test + 1);
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
