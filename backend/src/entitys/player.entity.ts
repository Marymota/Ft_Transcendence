import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    country: string;

    @Column()
    avatar: string;
}
