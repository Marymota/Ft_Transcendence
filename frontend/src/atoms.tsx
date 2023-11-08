import { atom } from "recoil";
import { IChat, IUser } from "./types";

export const usersAtom = atom<IUser[]>({
  key: "usersAtom",
  default: [],
});

export const chatsAtom = atom<IChat[]>({
  key: "chatsAtom",
  default: [],
});
