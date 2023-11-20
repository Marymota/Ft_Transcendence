import User from './user.entity';
import Channel from './channel.entity';
declare class Message {
    id: string;
    date: Date;
    sender: User;
    content: string;
    channel: Channel;
}
export default Message;
