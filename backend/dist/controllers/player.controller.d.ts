import { PlayerService } from '../services/player.service';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    registerPlayer(nickname: string, country: string, avatar: string): Promise<any>;
}
