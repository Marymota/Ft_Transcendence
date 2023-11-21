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
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';

@WebSocketGateway({ cors: { origin: '*' } })
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
    console.log('webScoket: frontend asked for all channels');
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
}
