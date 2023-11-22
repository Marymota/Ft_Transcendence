import { useRecoilState } from "recoil";
import "./MessageBox.css";
import { userChatsAtom } from "../../../dataVars/atoms";
import { useEffect, useState } from "react";
import { getUserChannels } from "../../../dataVars/serverRequests";
import { IMessage, IChat } from "../../../dataVars/types";

interface Props {
  currentUser: string;
  selectedChannel: string;
}

export default function MessageBox({ currentUser, selectedChannel }: Props) {
  const [chats, setChats] = useRecoilState(userChatsAtom);
  const [chat, setChat] = useState<IChat>();

  useEffect(() => {
    getUserChannels(currentUser).then((value) => {
      setChats(value);
    });
  }, []);

  for (let i = 0; i < chats.length; i++) {
    if (chats[i].displayname == selectedChannel) {
      setChat(chats[i]);
    }
  }

  if (chat && chat.history && chat.history.length > 0) {
    chat.history
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
              <div className="messageBuble receivedBuble">{msg.content}</div>
            </div>
          );
        }
      });
  } else {
    return <p>You have no messages</p>;
  }
}
