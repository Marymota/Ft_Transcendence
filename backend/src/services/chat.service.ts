import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Channel from 'src/entitys/channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Channel) private chatRepo: Repository<Channel>,
  ) {}

	async findById(id: string) {
    const channel: Channel = await this.chatRepo.findOneBy({ id });
    if (channel) {
      return channel;
    }
    throw new HttpException(
      'ChannelId provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }

	async findByDisplayName(displayname: string) {
    const channel = await this.chatRepo.findOneBy({ displayname });
    if (channel) return channel;
    throw new HttpException(
      'Display name provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }
}
