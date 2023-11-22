import { useRecoilState } from "recoil";
import "./FriendsList.css";
import { allUsersAtom, userFriendsAtom } from "../../../../dataVars/atoms";
import { useEffect } from "react";
import {
  getAllUsers,
  getUserFriends,
} from "../../../../dataVars/serverRequests";
import { IUser } from "../../../../dataVars/types";

interface Props {
  currentUser: string;
}

export default function FriendsList({ currentUser }: Props) {
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const [friends, setFriends] = useRecoilState(userFriendsAtom);

  useEffect(() => {
    getUserFriends(currentUser).then((value) => {
      setFriends(value);
    });
    getAllUsers().then((value) => {
      setUsers(value);
    });
    return () => void console.log("recycling");
  }, []);

  return (
    <div className="mainTitle3">
      <div className="title inputMain">all users</div>
      <div className="friends inputMain">
        {users.map((user: IUser) => {
          console.log(users);
          if (user.displayName != currentUser)
            return (
              <div key={user.id} className="friendCard">
                <div className="friendName">{user.userName}</div>
                <div className="friendAdd" onClick={() => {}}>
                  +
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
