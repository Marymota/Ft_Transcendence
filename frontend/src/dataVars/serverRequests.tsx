import { IChat, IUser } from "./types";
import { socket } from "../App";

// USERS

// get all users
export async function getUserChannels(userName: string) {
  console.log(`asking backend for the user ${userName} channels.`);
  return (await socket.subscribeOnce(
    "getUserChannels",
    userName
  )) as unknown as IChat[];
}

export async function getUserFriends(userName: string) {
  console.log(`asking backend for the user ${userName} friends.`);
  return (await socket.subscribeOnce(
    "getUserFriends",
    userName
  )) as unknown as string[];
}

export async function getAllUsers() {
  console.log(`asking backend for all users`);
  return (await socket.subscribeOnce("getAllUsers", null)) as unknown as IUser[];
}
