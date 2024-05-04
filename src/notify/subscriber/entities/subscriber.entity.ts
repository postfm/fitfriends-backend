import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscriber_id: number;

  @Column()
  trainer_id: number;

  @Column()
  subscriber_email: string;
}
