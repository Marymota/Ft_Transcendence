import { 
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	MessageBody,
	ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { string } from '@hapi/joi';

const existingRooms = []
const chatLogs = []

@WebSocketGateway({ cors: {origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  
  private logger: Logger = new Logger('Gateway Log');

  @SubscribeMessage('message')
  handleMessage(
	@MessageBody() message: string,
	@ConnectedSocket() socket: Socket,
  ) {
	const roomId = message.toString().substring(message.toString().indexOf(',') + 1);
	const roomName = message.toString().substring(0, message.toString().indexOf(','));
    this.logger.log(`message recieved ${roomName}, in room ${roomId}`);
	chatLogs[roomId] = [...chatLogs[roomId], roomName];
	this.logger.log(`Chat log: ${chatLogs[roomId]}`);
	const rooms = [...socket.rooms].slice(0);
	this.server.to(rooms[1]).emit('update', roomName);
  }

  @SubscribeMessage('joinRoom')
  joinOrUpdateRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`User ${socket.id}, joined Room ${roomId}`);
    const rooms = [...socket.rooms].slice(0);
    if (rooms.length == 2) socket.leave(rooms[1]);
    socket.join(roomId);
  }

  @SubscribeMessage('createRoom')
  createRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`User ${socket.id}, created Room ${roomId}`);
	existingRooms.push(roomId);
	chatLogs.push([]);
  }
}
