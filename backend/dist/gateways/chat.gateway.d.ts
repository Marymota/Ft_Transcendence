import { Server } from 'socket.io';
import { UserService } from 'src/services/user.service';
export declare class ChatGateway {
    private userService;
    constructor(userService: UserService);
    server: Server;
    private logger;
    sendMessage(messageData: {
        chatId: number;
        sender: string;
        content: string;
    }): Promise<void>;
    getUsers(): Promise<undefined>;
    getMessages(): Promise<undefined>;
}
