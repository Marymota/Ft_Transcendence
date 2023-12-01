import { Injectable, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Player } from '../entitys/player.entity'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) {}

    async createPlayer(nickname: string, country: string, avatar: string): Promise<Player> {
        const player = this.playerRepository.create({ nickname, country, avatar });
        return await this.playerRepository.save(player);
    } catch (error) {
        console.error('Error creating player:', error.message);
        throw error;
    }

    async findPlayerByNickname(nickname: string): Promise<Player | undefined> {
        return await this.playerRepository.findOne({ where: { nickname } });
    }
}