import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/services/user.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  constructor(private userService: UserService) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('Gateway Log');

  // SEND MESSAGE FUNCTION ---------------------------------------

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

  // GET USERS FUNCTION

  @SubscribeMessage('getUsers')
  async getUsers(): Promise<undefined> {
    console.log('webScoket: frontend asked for all users');
  }

  // GET MESSAGES FUNCTION

  @SubscribeMessage('getChannels')
  async getMessages(): Promise<undefined> {
    console.log('webScoket: frontend asked for all channels');
  }
}
