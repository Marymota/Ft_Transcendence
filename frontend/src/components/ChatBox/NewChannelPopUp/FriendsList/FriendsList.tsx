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
    getAllUsers().then((value) => {
      setUsers(value);
    });
    getUserFriends(currentUser).then((value) => {
      setFriends(value);
    });
    console.log(users);
  }, []);

  return (
    <div className="mainTitle3">
      <div className="title inputMain">all users</div>
      <div className="friends inputMain">
        {users.map((user: IUser) => {
          let isFriend = 0;
          friends.map((displayName: string) => {
            if (displayName == user.displayName) isFriend = 1;
          });
          if (user.displayName != currentUser)
            return (
              <div className="friendCard">
                <div className="friendName">{user.displayName}</div>
                {isFriend == 0 && (
                  <div className="friendAdd" onClick={() => {}}>
                    +
                  </div>
                )}
                {isFriend == 1 && (
                  <div className="friendRemove" onClick={() => {}}>
                    -
                  </div>
                )}
              </div>
            );
        })}
      </div>
    </div>
  );
}
