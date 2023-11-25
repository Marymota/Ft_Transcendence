import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Channel from 'src/entitys/channel.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Channel)
    private chatRepo: Repository<Channel>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
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

  async findByDisplayName(displayName: string) {
    const channel = await this.chatRepo.findOne({
      where: { displayName: displayName },
    });
    if (channel) return channel;
    throw new HttpException(
      'Display name provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }

  async createChannel(
    displayName: string,
    avatar: string,
    members: string[],
    creator: string,
    type: 'personal' | 'private' | 'public',
  ) {
    if (displayName.length < 1 && type != 'personal') {
      throw new HttpException(
        'Public or private channel must have displayName',
        HttpStatus.FORBIDDEN,
      );
    }
    const creatorUser = await this.userService.findByUsername(creator);
    if (!creatorUser) {
      throw new HttpException(
        'Creator userName not found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (members.length > 1 && type == 'personal') {
      throw new HttpException(
        'type of channel not compatible with more than two mebers',
        HttpStatus.FORBIDDEN,
      );
    }
    // TODO - Ensure the didplayName is unique
    let index = members.indexOf('', 0);
    if (index > -1) members.splice(index, 1);
    members.push(creator);
    let userMembers = [];
    for (let i = 0; i < members.length; i++) {
      const memberUser = await this.userService.findByUsername(members[i]);
      if (!memberUser) {
        throw new HttpException(
          'member userName not found',
          HttpStatus.NOT_FOUND,
        );
      }
      userMembers.push(memberUser);
    }
    const uniqueMembers = Array.from(new Set(userMembers));
    const newChannel = this.chatRepo.create({
      displayName: displayName,
      type: type,
      avatar: avatar,
      members: [],
      creator: creator,
      admins: [creatorUser.userName],
      blocked: [],
      history: [],
    });
    const savedChannel = await this.chatRepo.save(newChannel);
    savedChannel.members = uniqueMembers;
    const updatedChannel = await this.chatRepo.save(savedChannel);
    for (let i = 0; i < uniqueMembers.length; i++) {
      this.userService.addChannelToUser(
        uniqueMembers[i].userName,
        updatedChannel.displayName,
      );
    }
    return updatedChannel;
  }

  async GetAllChannelsFromDB() {
    const channels = await this.chatRepo.find({ relations: { members: true } });
    if (channels) return channels;
    else return [];	
  }
}
