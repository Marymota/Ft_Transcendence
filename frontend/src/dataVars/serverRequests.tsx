import { IChat, IUser } from "./types";
import { socket } from "../App";

// USERS

export async function getUsersFromServer() {
  return (await socket.subscribeOnce("getUsers", null)) as unknown as IUser[];
}

// CHATS

export async function getChatsFromServer() {
  return (await socket.subscribeOnce(
    "getChannels",
    null
  )) as unknown as IChat[];
}
