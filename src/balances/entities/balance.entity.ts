import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

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
  training: string;

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
}
