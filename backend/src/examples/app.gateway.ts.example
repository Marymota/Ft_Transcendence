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
      chatId: number;
      sender: string;
      content: string;
    },
  ) {
    console.log('1 msg content: ', messageData.content);
    console.log('trying to save message in database');
    const numberOfChats = await prisma.chat.count();
    if (
      messageData.chatId < 1 ||
      messageData.chatId > numberOfChats ||
      messageData.sender == '' ||
      messageData.content == ''
    )
      return;
    const chat = await prisma.chat.findFirst({
      where: { id: messageData.chatId },
      select: {
        id: true,
        type: true,
        chatName: true,
        history: true,
        members: true,
      },
    });
    const senderUser = await prisma.user.findFirst({
      where: { userName: messageData.sender },
      select: {
        id: true,
        userName: true,
      },
    });
    if (!senderUser || !chat) return;
    // create message
    console.log('2 msg content: ', messageData.content);
    const msg = await prisma.message.create({
      data: {
        content: messageData.content,
        senderId: senderUser.id,
        chatId: chat.id,
      },
    });
    console.log('sucessfully saved the message in the database');
  }

  // GET USERS FUNCTION

  @SubscribeMessage('getUsers')
  async getUsers(): Promise<undefined> {
    const users = await prisma.user.findMany({
      include: {
        MessagesSent: true,
        Chats: true,
      },
    });
    this.server.emit('getUsers', users);
    console.log('sent the list of USERS to frontend');
  }

  // GET MESSAGES FUNCTION

  @SubscribeMessage('getChannels')
  async getMessages(): Promise<undefined> {
    const chats = await prisma.chat.findMany({
      include: {
        history: true,
        members: true,
      },
    });
    this.server.emit('getChannels', chats);
    console.log('sent the list of CHATS to frontend');
  }
}
