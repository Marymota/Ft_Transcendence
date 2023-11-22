import { useEffect, useState } from "react";
import "./newChannelPage.css";
import { useRecoilState } from "recoil";
import { userFriendsAtom } from "../../../../dataVars/atoms";
import { getUserFriends } from "../../../../dataVars/serverRequests";

interface Props {
  currentUser: string;
}

export default function NewChannelPage({ currentUser }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("public");
  const [avatar, setAvatar] = useState("");
  const [friends, setFriends] = useRecoilState(userFriendsAtom);

  useEffect(() => {
    getUserFriends(currentUser).then((value) => {
      setFriends(value);
    });
  }, []);

  return (
    <div className="mainTitle2">
      <input
        className="inputMain"
        id="displayname"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Type
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div
            className="dropdown-item"
            onClick={() => {
              setType("Private");
            }}
          >
            Private
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              setType("Public");
            }}
          >
            Public
          </div>
        </div>
      </div>
      <input
        className="inputMain"
        id="avatar"
        type="text"
        placeholder="Description"
        value={avatar}
        onChange={(event) => {
          setAvatar(event.target.value);
        }}
      />
      <div className="inputMain">
        <p>Members</p>
        <div className="friends">
          {friends.map((friend: string) => (
            <div className="friendCard">
              <div className="friendName">{friend}</div>
              <div className="friendAdd">+</div>
            </div>
          ))}
        </div>
      </div>
      <button className="inputMain createChannelButton" onClick={() => {}}>
        <div>Create</div>
      </button>
    </div>
  );
}
