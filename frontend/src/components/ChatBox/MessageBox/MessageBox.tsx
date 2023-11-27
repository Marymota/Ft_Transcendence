import { useRecoilState, useRecoilValue } from "recoil";
import "./MessageBox.css";
import { selectedChannelAtom, userChatsAtom } from "../../../dataVars/atoms";
import { useEffect, useState } from "react";
import { getUserChannels } from "../../../dataVars/serverRequests";
import { IMessage, IChat } from "../../../dataVars/types";

interface Props {
  currentUser: string;
}

export default function MessageBox({ currentUser }: Props) {
  const [chats, setChats] = useRecoilState(userChatsAtom);
  const [chat, setChat] = useState<IChat>();
  const selectedChannel = useRecoilValue(selectedChannelAtom);

  useEffect(() => {
    getUserChannels(currentUser).then((value) => {
      setChats(value);
    });
    return () => void console.log("recycling messageBox");
  }, []);

  for (let i = 0; i < chats.length; i++) {
    if (chats[i].displayName == selectedChannel) {
      setChat(chats[i]);
    }
  }
  if (chat && chat.history && chat.history.length > 0) {
    console.log("test2.1");
    return (
      <div className="messagesBox">
        {chat.history
          .slice(0)
          .reverse()
          .map((msg: IMessage) => {
            if (msg.sender.userName == currentUser) {
              return (
                <div key={msg.id} className="message sentMessage">
                  <div className="messageBuble sentBuble">{msg.content}</div>
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
          })}
      </div>
    );
  } else {
    console.log("test2.2");
    return (
      <div className="messagesBox">
        <p>You have no messages</p>
      </div>
    );
  }
}
