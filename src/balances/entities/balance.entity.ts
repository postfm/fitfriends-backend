import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  cratedAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.balance)
  @JoinColumn({ name: 'user_id ' })
  user: User;
}
