import { IChat, IUser } from "./types";
import { socket } from "../App";

// USERS

// get all users
export async function getUserChannels(userName: string) {
  console.log(`asking backend for the user ${userName} channels.`);
  return await socket.send<IChat[]>("getUserChannels", userName);
}

export async function getUserFriends(userName: string) {
  console.log(`asking backend for the user ${userName} friends.`);
  return await socket.send<string[]>("getUserFriends", userName);
}

export async function getAllUsers() {
  console.log(`asking backend for all users`);
  return await socket.send<IUser[]>("getAllUsers", null);
}
