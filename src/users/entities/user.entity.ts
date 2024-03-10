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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
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
  })
  timeOfTraining: string;

  @Column({ name: 'calories_to_lose' })
  caloriesToLose: number;

  @Column({ name: 'calories_per_day' })
  caloriesPerDay: number;

  @Column({ name: 'ready_to_train' })
  readyToTrain: boolean;
}
