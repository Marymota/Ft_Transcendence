import { Module } from '@nestjs/common';
import { ChatGateway } from '../gateways/chat.gateway';
import { UserModule } from './user.module';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { ChatService } from 'src/services/chat.service';

@Module({
  imports: [UserModule],
  providers: [ChatGateway, UserService, ChatService],
  controllers: [UserController],
  exports: [ChatService],
})
export class ChatModule {}
