import User from './user.entity';
import Channel from './channel.entity';
declare class Message {
    id: string;
    date: Date;
    sender: User;
    channel: Channel;
    content: string;
}
export default Message;
