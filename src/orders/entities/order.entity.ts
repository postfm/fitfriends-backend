import { Training } from 'src/trainings/entities/training.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Training, (training) => training.orders)
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
