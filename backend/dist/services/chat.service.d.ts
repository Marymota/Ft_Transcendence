import Channel from 'src/entitys/channel.entity';
import { Repository } from 'typeorm';
export declare class ChatService {
    private chatRepo;
    constructor(chatRepo: Repository<Channel>);
    findById(id: string): Promise<Channel>;
    findByDisplayName(displayname: string): Promise<Channel>;
}
