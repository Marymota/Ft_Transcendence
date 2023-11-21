import "./newChannelPage.css";

export default function NewChannelPage() {
  return (
    <div className="mainTitle2">
      <input
        className="inputMain"
        id="displayname"
        type="text"
        placeholder="Name"
      ></input>
      <input
        className="inputMain"
        id="type"
        type="text"
        placeholder="Type"
      ></input>
      <input
        className="inputMain"
        id="avatar"
        type="text"
        placeholder="Description"
      ></input>
      <div className="inputMain">
        <p>Members</p>
        <input placeholder="Search"></input>
        <div className="userToAdd"></div>
      </div>
      <button className="inputMain createChannelButton" onClick={() => {}}>
        <div>Create</div>
      </button>
    </div>
  );
}
