import { Module } from '@nestjs/common';
import { ChatGateway } from '../gateways/chat.gateway';
import { UserModule } from './user.module';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [UserModule],
  providers: [ChatGateway, UserService],
  controllers: [UserController],
})
export class ChatModule {}
