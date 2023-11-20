import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany((type) => User, (user) => user.friends)
  friends: User[];

  @OneToMany((type) => User, (user) => user.blocked)
  blocked: User[];

  @OneToMany((type) => Channel, (channel) => channel.members)
  chats: Channel[];

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
