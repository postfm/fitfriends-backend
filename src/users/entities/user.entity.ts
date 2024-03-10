import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @Column()
  role: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  level_of_train: string;

  @Column()
  type_of_training: string;

  @Column()
  time_of_training: string;

  @Column()
  calories_to_lose: number;

  @Column()
  calories_per_day: number;

  @Column()
  ready_to_train: boolean;
}
