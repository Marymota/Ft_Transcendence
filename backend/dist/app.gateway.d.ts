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
        sender: string;
        recipient: string;
        content: string;
    }): Promise<String>;
    getUsers(client: Socket): Promise<undefined>;
}
