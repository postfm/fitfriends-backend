import { Balance } from 'src/balances/entities/balance.entity';
import { Friend } from 'src/friends/entities/friend.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Training } from 'src/trainings/entities/training.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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

  @Column('enum', { enum: ['женский', 'мужской', 'неважно'] })
  gender: string;

  @Column('timestamp with time zone')
  birthday: Date;

  @Column('enum', { enum: ['тренер', 'пользователь'] })
  roles: string[];

  @Column()
  description: string;

  @Column('enum', {
    enum: ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'],
  })
  location: string;

  @Column()
  image: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column('enum', {
    enum: ['новичок', 'любитель', 'профессионал'],
    name: 'level_of_train',
  })
  levelOfTrain: string;

  @Column('simple-array', { name: 'type_of_training' })
  typeOfTraining: string[];

  @Column('enum', {
    enum: ['10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин'],
    name: 'time_of_training',
    nullable: true,
  })
  timeOfTraining: string;

  @Column({ name: 'calories_to_lose', nullable: true })
  caloriesToLose: number;

  @Column({ name: 'calories_per_day', nullable: true })
  caloriesPerDay: number;

  @Column({ name: 'ready_to_train', nullable: true })
  readyToTrain: boolean;

  @Column({ nullable: true })
  certificates: string;

  @Column({ nullable: true })
  merits: string;

  @Column({ name: 'personal_trainings', nullable: true })
  personalTrainings: boolean;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @OneToMany(() => Training, (training) => training.user, {
    onDelete: 'CASCADE',
  })
  trainings: Training[];

  @OneToMany(() => Order, (order) => order.user, {
    onDelete: 'CASCADE',
  })
  orders: Order[];

  @OneToOne(() => Friend, (friend) => friend.friend)
  friends: Friend[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToOne(() => Balance, (balance) => balance.user)
  balance: Balance;
}
