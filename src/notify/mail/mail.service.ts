import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_TRAINING_SUBJECT } from './mail.constant';
import { Subscriber } from '../subscriber/entities/subscriber.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly dataSource: DataSource,
  ) {}

  public async newsletter(trainer_id: number): Promise<void> {
    const subscribers = await this.dataSource
      .getRepository(Subscriber)
      .createQueryBuilder('subscriber')
      .where('trainer_id=:id', { id: trainer_id })
      .getMany();

    const subscribersEmail = (await subscribers).map(
      (subscriber) => subscriber.subscriber_email,
    );

    const subscriberList = subscribersEmail.join(',');

    this.mailerService
      .sendMail({
        to: `${subscriberList}`,
        from: 'noreply@nestjs.com',
        subject: EMAIL_ADD_TRAINING_SUBJECT,
        template: '/add-training', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          email: `${subscriberList}`,
          training: `${trainer_id}`,
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}
