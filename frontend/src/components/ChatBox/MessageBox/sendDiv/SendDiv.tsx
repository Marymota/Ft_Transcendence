import { useState } from "react";
import "./SendDiv.css";
import {
  getChannelMessages,
  sendMessage,
} from "../../../../dataVars/serverRequests";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  channelMessagesAtom,
  selectedChannelAtom,
} from "../../../../dataVars/atoms";

interface Props {
  id: string;
  currentUser: string;
}

export default function SendDiv({ id, currentUser }: Props) {
  const [message, setMessage] = useState("");
  const selectedChannel = useRecoilValue(selectedChannelAtom);
  const setMessages = useSetRecoilState(channelMessagesAtom);

  return (
    <div className="writeBox">
      <input
        id={id}
        className="sendTextInput"
        placeholder="Write..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button
        className="sendMessageButton"
        onClick={() => {
          if (selectedChannel != "" && message != "") {
            sendMessage(selectedChannel, currentUser, message);

            getChannelMessages(selectedChannel, currentUser).then((value) => {
              setMessages(value);
            });
          }
        }}
      >
        <div>Send</div>
      </button>
    </div>
  );
}
