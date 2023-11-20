import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
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

  @Column({ type: String, array: true })
  members: string[];

  @Column()
  creator: string;

  @Column({ type: String, array: true })
  admins: string[];

  @Column({ type: String, array: true })
  blocked: string[];

	// This doesnt appear in database
  @OneToMany((type) => Message, (message) => message.channel)
  history: Message[];
}

export default Channel;
