import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Channel from './channel.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true })
  displayname: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  is2FOn: boolean;

  @Column()
  secret2F: string;

  @Column()
  elo: number;

  @Column({ type: String, array: true })
  friends: string[];

  @Column({ type: String, array: true })
  blocked: string[];

  @ManyToMany(() => Channel, (channel) => channel.members)
  @JoinTable()
  channels: Channel[];

  @Column()
  msgHist: string;

  @Column()
  idWebSocket: string;

  @Column()
  gameNumber: number;

  @Column()
  gameWin: number;

  @Column()
  gameLose: number;

  @Column()
  winLoseRate: string;

  @Column()
  totalPointGet: number;

  @Column()
  totalPointTake: number;

  @Column()
  pointGetTakeRate: string;

  @Column()
  winStreak: number;

  @Column()
  gameHist: string;

  @Column()
  xp: number;

  @Column()
  totalGame: number;

  @Column()
  socketID: string;

  @Column()
  slot: number;

  @Column({ default: true })
  isActive: boolean;
}

export default User;
