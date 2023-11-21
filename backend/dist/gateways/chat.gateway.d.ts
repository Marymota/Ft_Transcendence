import { Server } from 'socket.io';
import Channel from 'src/entitys/channel.entity';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';
export declare class ChatGateway {
    private userService;
    private chatService;
    constructor(userService: UserService, chatService: ChatService);
    server: Server;
    private logger;
    sendMessage(messageData: {
        chatId: number;
        sender: string;
        content: string;
    }): Promise<void>;
    getUserChannels(userName: string): Promise<Channel[]>;
    createChannel(data: {
        creator: string;
        displayName: string;
        avatar: string;
        members: string[];
        type: 'personal' | 'private' | 'public';
    }): Promise<undefined>;
}
