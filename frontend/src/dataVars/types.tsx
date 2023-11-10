export interface IMessage {
  id: number;
  date: Date;
  content: string;
  senderId: number;
  chatId: number;
  Chat: IChat;
  Sender: IUser;
}

export interface IUser {
  id: number;
  firstName: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  MessagesSent: IMessage[];
  Chats: IChat[];
}

export interface IChat {
  id: number;
  type: string;
  chatName: string;
  history: IMessage[];
  members: IUser[];
}
