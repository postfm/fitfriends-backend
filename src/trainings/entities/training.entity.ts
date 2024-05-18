import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
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
export class Training {
  @PrimaryGeneratedColumn()
  training_id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column('enum', { enum: ['новичок', 'любитель', 'профессионал'] })
  level: string;

  @Column('enum', {
    enum: [
      'йога',
      'бег',
      'бокс',
      'стретчинг',
      'кроссфит',
      'аэробика',
      'пилатес',
    ],
  })
  type: string;

  @Column('enum', {
    enum: ['10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин'],
  })
  duration: string;

  @Column()
  price: number;

  @Column()
  calories: number;

  @Column()
  description: string;

  @Column('enum', { enum: ['для женщин', 'для мужчин', 'для всех'] })
  gender: string;

  @Column()
  video: string;

  @Column({ type: 'real' })
  rating: number;

  @Column({ name: 'special_offer' })
  specialOffer: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.trainings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.training, { onDelete: 'CASCADE' })
  orders: Order[];

  @OneToMany(() => Review, (review) => review.training, { onDelete: 'CASCADE' })
  reviews: Review[];
}
