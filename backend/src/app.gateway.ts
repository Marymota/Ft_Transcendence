import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('Gateway Log');

  @SubscribeMessage('printUsers')
  async print(@ConnectedSocket() client: Socket): Promise<undefined> {
    const users = await prisma.user.findMany();
    console.log(users);
  }

  // CREATE USER FUNCTION ---------------------------------------

  @SubscribeMessage('createUser')
  async createUser(
    @MessageBody()
    messageData: {
      firstName: string;
      userName: string;
      avatar: string;
    },
  ): Promise<string> {
    const allUsers = await prisma.user.findMany();
    for (let index = 0; index < allUsers.length; index++) {
      if (messageData.userName == allUsers[index].userName) {
        console.log('invalid userName');
        return 'invalid userName';
      }
    }
    await prisma.user.create({
      data: {
        firstName: messageData.firstName,
        userName: messageData.userName,
        avatar: messageData.avatar,
      },
    });
    console.log('created user');
    return 'created user';
  }

  // SEND MESSAGE FUNCTION ---------------------------------------

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    messageData: {
      sender: string;
      recipient: string;
      content: string;
    },
  ): Promise<String> {
    if (
      messageData.content == '' ||
      messageData.sender == '' ||
      messageData.recipient == ''
    )
      return 'invalid message';
    const senderUser = await prisma.user.findUnique({
      where: { userName: messageData.sender },
      select: {
        id: true,
        userName: true,
        MessagesSent: true,
      },
    });
    const recepientUser = await prisma.user.findUnique({
      where: { userName: messageData.recipient },
      select: {
        id: true,
        userName: true,
        MessagesSent: true,
      },
    });
    if (!senderUser || !recepientUser) return 'invalid isers';
    // create message
    const msg = await prisma.message.create({
      data: {
        content: messageData.content,
        senderId: senderUser.id,
      },
    });
    return 'msg added';
  }

  // GET USERS FUNCTION

  @SubscribeMessage('getUsers')
  async getUsers(@ConnectedSocket() client: Socket): Promise<undefined> {
    const users = await prisma.user.findMany();
    this.server.emit('getUsers', users);
    console.log('sent users');
  }

  // GET MESSAGES FUNCTION

  @SubscribeMessage('getChannelMessages')
  async getMessages(
    @MessageBody() messageData: { sender: string; recepient: string },
  ): Promise<string> {
    if (messageData.sender == '' || messageData.recepient == '')
      return 'invalid parameters';
    const sender = await prisma.user.findFirst({
      where: { userName: messageData.sender },
      select: {
        MessagesSent: true,
      },
    });

    const recepient = await prisma.user.findFirst({
      where: { userName: messageData.recepient },
      select: {
        id: true,
      },
    });
    let messages = sender.MessagesSent;
    let index = 0;
    while (index < messages.length) {
      for (index = 0; index < messages.length; index++) {
        if (messages[index].chatId != recepient.id) {
          messages = messages.splice(index, 1);
          break;
        }
      }
    }
    this.server.emit('getChannelMessages', messages);
    return 'sucess';
  }
}
