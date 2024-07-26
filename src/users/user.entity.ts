import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facebookId: string;

  @Column()
  name: string;

  @Column()
  friendsCount: number;
}
