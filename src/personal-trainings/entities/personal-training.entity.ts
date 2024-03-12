import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PersonalTraining {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  initiator: number;

  @Column()
  user: number;

  @Column('enum', { enum: ['на рассмотрении', 'отклонён', 'принят'] })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  cratedAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
