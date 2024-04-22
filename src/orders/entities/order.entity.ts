import { Training } from 'src/trainings/entities/training.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: ['абонемент'] })
  type: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  sum: number;

  @Column('enum', { enum: ['visa', 'mir', 'umoney'] })
  pay: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  cratedAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => Training, (training) => training.order, {
    onDelete: 'CASCADE',
  })
  trainings: Training[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
