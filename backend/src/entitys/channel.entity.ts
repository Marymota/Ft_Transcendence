import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
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

  @ManyToMany(() => User, (user) => user.channels)
  @JoinTable()
  members: User[];

  @Column()
  creator: string;

  @Column({ type: String, array: true })
  admins: string[];

  @Column({ type: String, array: true })
  blocked: string[];

  // This doesnt appear in database
  @OneToMany(() => Message, (message) => message.channel)
  history: Message[];
}

export default Channel;
