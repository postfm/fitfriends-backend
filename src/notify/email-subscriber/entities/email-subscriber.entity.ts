import { Subscriber } from 'src/helpers/types/subscriber.interface';
import { Entity } from 'typeorm';

@Entity()
export class EmailSubscriber implements Subscriber {
  public id?: string;
  public email: string;
  public name: string;

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }

  public populate(data: Subscriber): EmailSubscriber {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.name = data.name;

    return this;
  }

  static fromObject(data: Subscriber): EmailSubscriber {
    return new EmailSubscriber().populate(data);
  }
}
