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

  @Column()
  content: string;

	@ManyToOne(() => Channel, (channel) => channel.history)
  channel: Channel;
}

export default Message;
