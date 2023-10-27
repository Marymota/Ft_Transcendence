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

  @SubscribeMessage('createUser')
  async create(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<undefined> {
    await prisma.user.create({
      data: {
        userName: data,
        firstName: 'Alice',
        avatar: '',
      },
    });
    console.log(`created user: ${data}`);
  }

  @SubscribeMessage('printUsers')
  async print(@ConnectedSocket() client: Socket): Promise<undefined> {
    const users = await prisma.user.findMany();
    console.log(users);
  }
}
