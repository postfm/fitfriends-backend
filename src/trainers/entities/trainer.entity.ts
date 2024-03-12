import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trainer {
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
  role: string;

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

  @Column()
  certificates: string;

  @Column()
  merits: string;

  @Column({ name: 'personal_trainings' })
  personalTrainings: boolean;
}
