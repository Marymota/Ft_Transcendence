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
    if (messageData.content == '') return 'invalid message';
    const allUsers = await prisma.user.findMany();
    for (let index = 0; index < allUsers.length; index++) {
      // if sender exists
      if (messageData.sender == allUsers[index].userName) {
        for (let idx = 0; idx < allUsers.length; idx++) {
          // if recipient exists
          if (messageData.recipient == allUsers[idx].userName) {
            // create message
            const msg = await prisma.message.create({
              data: {
                content: messageData.content,
                recepientId: allUsers[idx].id,
              },
            });
            // find user past messages
            const res = await prisma.user.findUnique({
              where: { userName: allUsers[index].userName },
              select: {
                Messages: true,
              },
            });
            // update user that sent message
            await prisma.user.update({
              data: {
                Messages: {
                  set: [...res.Messages, msg],
                },
              },
              where: { userName: allUsers[index].userName },
            });
            return 'sent message';
          }
        }
      }
    }
    return 'invalid message';
  }
}
