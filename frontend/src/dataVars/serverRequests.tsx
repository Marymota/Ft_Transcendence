import { IChat, IUser } from "./types";
import { socket } from "../App";

// USERS

// get all users
export async function getUsersFromServer() {
  return (await socket.subscribeOnce("getUsers", null)) as unknown as IUser[];
}

// CHATS

// get all chats
export async function getChatsFromServer() {
  return (await socket.subscribeOnce(
    "getChannels",
    null
  )) as unknown as IChat[];
}

// add message to chat in database
export async function addMsgToDataBase(
  chatId: number,
  sender: string,
  content: string
) {
  console.log("msg content", content);
  socket.send("sendMessage", {
    chatId,
    sender,
    content,
  });
}
