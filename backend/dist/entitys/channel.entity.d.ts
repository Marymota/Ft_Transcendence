import Message from './message.entity';
declare class Channel {
    id: string;
    displayname: string;
    avatar: string;
    members: string[];
    creator: string;
    admins: string[];
    blocked: string[];
    history: Message[];
}
export default Channel;
