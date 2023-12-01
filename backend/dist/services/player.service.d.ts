import { Repository } from "typeorm";
import { Player } from '../entitys/player.entity';
export declare class PlayerService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    createPlayer(nickname: string, country: string, avatar: string): Promise<Player>;
    catch(error: any): void;
    findPlayerByNickname(nickname: string): Promise<Player | undefined>;
}
