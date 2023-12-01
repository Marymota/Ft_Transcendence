import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import  { PlayerService } from '../services/player.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class PlayerGateway {
    constructor(private readonly playerService: PlayerService) {}

    @WebSocketServer() server: Server;

    @SubscribeMessage('registerPlayer')
    async handleRegistrationPlayer(client: any, data: any): Promise<void> {
        const { nickname, country, avatar } = data;

    try {
        const player = await this.playerService.createPlayer(nickname, country, avatar);
        this.server.emit('registrationResponse', { success: true, player });
        } catch (error) {
            this.server.emit('registrationResponse', { error: 'Failed to register player' });
        }
    }
}