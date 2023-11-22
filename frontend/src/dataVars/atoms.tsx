import { atom } from "recoil";
import { IChat, IUser } from "./types";

export const userChatsAtom = atom<IChat[]>({
  key: "userChatsAtom",
  default: [],
});

export const userFriendsAtom = atom<string[]>({
  key: "userFriendsAtom",
  default: [],
});

export const allUsersAtom = atom<IUser[]>({
  key: "allUsersAtom",
  default: [],
});
