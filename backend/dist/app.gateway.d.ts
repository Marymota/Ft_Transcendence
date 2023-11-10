import { Server, Socket } from 'socket.io';
export declare class AppGateway {
    server: Server;
    private logger;
    print(client: Socket): Promise<undefined>;
    createUser(messageData: {
        firstName: string;
        userName: string;
        avatar: string;
    }): Promise<string>;
    sendMessage(messageData: {
        chatId: number;
        sender: string;
        content: string;
    }): Promise<void>;
    getUsers(): Promise<undefined>;
    getMessages(): Promise<undefined>;
}
