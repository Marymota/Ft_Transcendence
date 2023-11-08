import { socket } from "../App";

// USERS

export async function getUsersFromServer() {
  let users = await socket.subscribeOnce("getUsers", null);
	console.log("users: ", users)
}

// CHATS

export function getAllChatsFromServer() {}
