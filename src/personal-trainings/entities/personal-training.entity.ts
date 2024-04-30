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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  cratedAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
