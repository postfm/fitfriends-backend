import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: ['абонемент'] })
  type: string;

  @Column()
  training: number;

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
}
