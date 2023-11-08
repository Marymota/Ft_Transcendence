import { useEffect } from "react";
import "./ChatBox.css";
import { IoMdSend } from "react-icons/io";
import { getUsersFromServer } from "../../dataVars/serverRequests";
// import { useRecoilState } from "recoil";
// import { usersAtom } from "../../atoms";
// import { socket } from "../../App";

// function sendMessage(content: string, sender: string, receiver: string) {
//   socket.emit("sendMessage", {
//     sender: sender,
//     recipient: receiver,
//     content: content,
//   });
// }

function ChatBox() {
  // const [users, setUsers] = useRecoilState(usersAtom);
  useEffect(() => {
    getUsersFromServer();
  });

  return (
    <>
      <div className="chatBox">
        <div className="chatGroups">
          <input className="searchGroup" placeholder="Search..."></input>
          <div className="group-names"></div>
        </div>
        <div className="chatDisplay">
          <div className="messagesBox"></div>
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
              //     channelSelected
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
