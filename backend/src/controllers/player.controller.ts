import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from '../services/player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post('register')
    async registerPlayer(
        @Body('nickname') nickname: string,
        @Body('country') country: string,
        @Body('avatar') avatar: string,
    ): Promise<any> {
        const existingPlayer = await this.playerService.findPlayerByNickname(nickname);

        if (existingPlayer) {
            return { error: 'Nickname is already taken' };
        }

        const newPlayer = await this.playerService.createPlayer(nickname, country, avatar);

        return { success: true, user: newPlayer };
    }
}