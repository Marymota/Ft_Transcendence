import { Server, Socket } from 'socket.io';
export declare class AppGateway {
    server: Server;
    private logger;
    create(data: string, client: Socket): Promise<undefined>;
    print(client: Socket): Promise<undefined>;
    sendMessage(messageData: {
        content: string;
        sender: string;
        receiver: string;
    }, client: Socket): Promise<undefined>;
}
