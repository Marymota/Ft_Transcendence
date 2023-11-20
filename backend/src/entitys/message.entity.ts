import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import User from './user.entity';
import Channel from './channel.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  date: Date;

  @OneToMany((type) => User, (user) => user.id)
  sender: User;

  @OneToMany((type) => Channel, (channel) => channel.id)
  channel: Channel;

  @Column()
  content: string;
}

export default Message;
