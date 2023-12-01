import { Server } from 'socket.io';
import { PlayerService } from '../services/player.service';
export declare class PlayerGateway {
    private readonly playerService;
    constructor(playerService: PlayerService);
    server: Server;
    handleRegistrationPlayer(client: any, data: any): Promise<void>;
}
