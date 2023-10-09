import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    private logger;
    handleMessage(message: string, socket: Socket): void;
    joinOrUpdateRoom(roomId: string, socket: Socket): void;
    createRoom(roomId: string, socket: Socket): void;
}
