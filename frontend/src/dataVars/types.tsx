export interface IMessage {
  id: number;
  date: Date;
  sender: IUser;
  content: string;
  channel: IChat;
}

export interface IUser {
  id: string;
  userName: string;
  displayname: string;
  email: string;
  avatar: string;
  friends: string[];
  channels: IChat[];
  msgHist: string;
  gameNumber: number;
  gameWin: number;
  gameLose: number;
  winLoseRate: string;
  totalPointGet: number;
  totalPointTake: number;
  pointGetTakeRate: string;
  winStreak: number;
  gameHist: string;
  xp: number;
  totalGame: number;
  isActive: boolean;
}

export interface IChat {
  id: number;
  displayname: string;
  type: "personal" | "private" | "public";
  avatar: string;
  members: IUser[];
  creator: string;
  admins: string[];
  history: IMessage[];
}
