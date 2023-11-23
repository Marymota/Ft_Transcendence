import { useEffect, useState } from "react";
import { getUserChannels } from "../../../dataVars/serverRequests";
import { useRecoilState } from "recoil";
import { userChatsAtom } from "../../../dataVars/atoms";
import { IChat, IUser } from "../../../dataVars/types";

interface Props {
  currentUser: string;
  getSelectedChannel: (channel: string) => void;
}

export default function ChannelButtons({
  currentUser,
  getSelectedChannel,
}: Props) {
  const [chats, setChats] = useRecoilState(userChatsAtom);
  const [selectedChannel, setSelectedChannel] = useState("");

  useEffect(() => {
    getUserChannels(currentUser).then((value) => {
      setChats(value);
    });
  }, []);

  if (chats.length > 0) {
    chats.map((chat: IChat) => {
      if (chat.type == "private" || chat.type == "public") {
        return (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChannel(chat.displayName);
              getSelectedChannel(chat.displayName);
            }}
            className={
              "groupName " +
              (selectedChannel == chat.displayName && "selectedChannelStyle")
            }
          >
            {chat.displayName}
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
              setSelectedChannel(chat.displayName);
              getSelectedChannel(chat.displayName);
            }}
            className={
              "groupName " +
              (selectedChannel == chat.displayName && "selectedChannelStyle")
            }
          >
            {name}
          </div>
        );
      }
    });
  } else {
    return (
      <>
        <p>No Conversations</p>
      </>
    );
  }
}
