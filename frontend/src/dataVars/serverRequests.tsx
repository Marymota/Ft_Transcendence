import { IChat } from "./types";
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
