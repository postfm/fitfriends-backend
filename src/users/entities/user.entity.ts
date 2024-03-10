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

  @Column('enum', { enum: ['женский', 'мужской', 'неважно'] })
  gender: string;

  @Column()
  birthday: Date;

  @Column('enum', { enum: ['тренер', 'пользователь'] })
  role: string;

  @Column()
  description: string;

  @Column('enum', {
    enum: ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'],
  })
  location: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column('enum', { enum: ['новичок', 'любитель', 'профессионал'] })
  level_of_train: string;

  @Column('simple-array')
  type_of_training: string[];

  @Column('enum', {
    enum: ['10-30 мин', '30-50 мин', '50-80 мин', '80-100 мин'],
  })
  time_of_training: string;

  @Column()
  calories_to_lose: number;

  @Column()
  calories_per_day: number;

  @Column()
  ready_to_train: boolean;
}
