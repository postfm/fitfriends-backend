import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEmailSubscriberDto } from '../dto/create-email-subscriber.dto';

@Entity()
export class EmailSubscriber {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public name: string;

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }

  public populate(data: CreateEmailSubscriberDto): EmailSubscriber {
    this.email = data.email;
    this.name = data.name;

    return this;
  }

  static fromObject(data: CreateEmailSubscriberDto): EmailSubscriber {
    return new EmailSubscriber().populate(data);
  }
}
