import "./newPrivateMessage.css";

export default function NewPrivateMessage() {
  return (
    <div className="mainTitle1">
      <div className="inputMain">
        <input placeholder="Search"></input>
        <div className="userToSpeak"></div>
      </div>
      <button className="inputMain createConversationButton" onClick={() => {}}>
        <div>New Conversation</div>
      </button>
    </div>
  );
}
