import { atom } from "recoil";
import { IChat } from "./types";

export const userChatsAtom = atom<IChat[]>({
  key: "userChatsAtom",
  default: [],
});

export const userFriendsArtom = atom<string[]>({
  key: "userFriendsArtom",
  default: [],
});
