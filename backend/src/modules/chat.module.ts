import { Module } from '@nestjs/common';
import { ChatGateway } from '../gateways/chat.gateway';
import { UserModule } from './user.module';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { ChatService } from 'src/services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from 'src/entitys/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), UserModule],
  providers: [ChatGateway, UserService, ChatService],
  controllers: [UserController],
  exports: [ChatService],
})
export class ChatModule {}
