import Channel from 'src/entitys/channel.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
export declare class ChatService {
    private chatRepo;
    private userService;
    constructor(chatRepo: Repository<Channel>, userService: UserService);
    findById(id: string): Promise<Channel>;
    findByDisplayName(displayName: string): Promise<Channel>;
    createChannel(displayName: string, avatar: string, members: string[], creator: string, type: 'personal' | 'private' | 'public'): Promise<void>;
}
