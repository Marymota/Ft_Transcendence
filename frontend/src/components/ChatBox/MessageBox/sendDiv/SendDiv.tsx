import "./SendDiv.css";

interface Props {
  id: string;
}

export default function SendDiv({ id }: Props) {
  return (
    <div className="writeBox">
      <input id={id} className="sendTextInput" placeholder="Write..."></input>
      <button className="sendMessageButton" onClick={() => {}}>
        <div>Send</div>
      </button>
    </div>
  );
}
