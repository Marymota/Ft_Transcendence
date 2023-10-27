import { Server, Socket } from 'socket.io';
export declare class AppGateway {
    server: Server;
    private logger;
    create(data: string, client: Socket): Promise<undefined>;
    print(client: Socket): Promise<undefined>;
}
