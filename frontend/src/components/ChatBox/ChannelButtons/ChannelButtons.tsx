import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedChannelAtom, userChatsAtom } from "../../../dataVars/atoms";
import { IChat, IUser } from "../../../dataVars/types";
import "./ChannelButtons.css";
import { getUserChannels } from "../../../dataVars/serverRequests";

interface Props {
  currentUser: string;
}

export default function ChannelButtons({ currentUser }: Props) {
  const [chats, setChats] = useRecoilState(userChatsAtom);
  const [selectedChannel, setSelectedChannel] =
    useRecoilState(selectedChannelAtom);

  useEffect(() => {
    getUserChannels(currentUser).then((value) => {
      setChats(value);
    });
    return () => void console.log("recycling channelButtons");
  }, []);

  if (chats.length > 0) {
    return (
      <div className="group-names">
        {chats.map((chat: IChat) => {
          if (chat.type == "private" || chat.type == "public") {
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChannel(chat.displayName);
                }}
                className={
                  "groupName " +
                  (selectedChannel == chat.displayName &&
                    "selectedChannelStyle")
                }
              >
                {chat.displayName}
              </div>
            );
          } else if (chat.type == "personal") {
            let name = "";
            chat.members.map((user: IUser) => {
              if (user.userName != currentUser) name = user.userName;
            });
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChannel(chat.displayName);
                }}
                className={
                  "groupName " +
                  (selectedChannel == chat.displayName &&
                    "selectedChannelStyle")
                }
              >
                {name}
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <div className="group-names">
        <p>No Conversations</p>
      </div>
    );
  }
}
