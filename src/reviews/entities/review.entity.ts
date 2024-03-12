import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: number;

  @Column()
  training: number;

  @Column()
  grade: number;

  @Column()
  text: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @CreateDateColumn({ name: 'update_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
