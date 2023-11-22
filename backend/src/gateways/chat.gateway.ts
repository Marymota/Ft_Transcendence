import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Channel from 'src/entitys/channel.entity';
import User from 'src/entitys/user.entity';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatGateway {
  constructor(
    private userService: UserService,
    private chatService: ChatService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('Gateway Log');

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    messageData: {
      chatId: number;
      sender: string;
      content: string;
    },
  ) {
    console.log('webScoket: frontend asked to send message');
  }

  @SubscribeMessage('getUserChannels')
  async getUserChannels(@MessageBody() userName: string): Promise<Channel[]> {
    console.log(
      `webScoket: frontend asked for all channels. User: ${userName}`,
    );
    const user = this.userService.findByUsername(userName);
    if (user) {
      const channels = (await user).channels;
      if (channels) return channels;
    }
  }

  @SubscribeMessage('createChannel')
  async createChannel(
    @MessageBody()
    data: {
      creator: string;
      displayName: string;
      avatar: string;
      members: string[];
      type: 'personal' | 'private' | 'public';
    },
  ): Promise<undefined> {
    console.log(
      `webScoket: frontend asked to creat a channel: {\n\tData:\n\t\tcreator: ${data.creator}\n\t\tdisplayName: ${data.displayName}\n\t\tavatar: ${data.avatar}\n\t\tmembers: ${data.members}}`,
    );
    if (data.creator.length < 1) return;
    await this.chatService.createChannel(
      data.displayName,
      data.avatar,
      data.members,
      data.creator,
      data.type,
    );
  }

  @SubscribeMessage('getUserFriends')
  async getUserFriends(
    @MessageBody()
    userName: string,
  ): Promise<string[]> {
    console.log(`webScoket: frontend asked for user ${userName} friends`);
    const user = await this.userService.findByUsername(userName);
    if (!user) return [];
    return user.friends;
  }

  @SubscribeMessage('getAllUsers')
  async getAllUsers(): Promise<User[]> {
    console.log(`webScoket: frontend asked for all users`);
    return await this.userService.GetAllUsersFromDB();
  }
}
