import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import User from './user.entity';
import Message from './message.entity';

@Entity()
class Channel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { unique: true })
  displayname: string;

  @Column()
  avatar: string;

  @OneToMany((type) => User, (user) => user.id)
  members: User[];

  @OneToMany((type) => User, (user) => user.id)
  creator: User;

  @OneToMany((type) => User, (user) => user.id)
  admins: User[];

  @OneToMany((type) => User, (user) => user.id)
  blocked: User[];

	@OneToMany((type) => Message, (message) => message.channel)
  history: Message[];
}

export default Channel;
