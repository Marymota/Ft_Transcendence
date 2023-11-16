declare class User {
    id: string;
    username: string;
    displayname: string;
    email: string;
    password: string;
    avatar: string;
    is2FOn: boolean;
    secret2F: string;
    elo: number;
    friends: string;
    blocked: string;
    chat: string;
    msgHist: string;
    idWebSocket: string;
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
    socketID: string;
    slot: number;
    inGame: boolean;
}
export default User;