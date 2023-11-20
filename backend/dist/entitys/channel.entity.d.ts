import User from './user.entity';
import Message from './message.entity';
declare class Channel {
    id: string;
    displayname: string;
    avatar: string;
    members: User[];
    creator: User;
    admins: User[];
    blocked: User[];
    history: Message[];
}
export default Channel;
