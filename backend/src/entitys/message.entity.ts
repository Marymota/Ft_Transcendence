import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import Channel from './channel.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  date: Date;

  @ManyToOne((type) => User, (user) => user.id)
  sender: User;

  @ManyToOne((type) => Channel, (channel) => channel.id)
  channel: Channel;

  @Column()
  content: string;
}

export default Message;
