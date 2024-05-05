import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_TRAINING_SUBJECT } from './mail.constant';
import { Subscriber } from '../subscriber/entities/subscriber.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public newsletter(subscriber: Subscriber[], trainer_id: number): void {
    const subscribers = subscriber.map(
      (subscriber) => subscriber.subscriber_email,
    );
    const subscriberList = subscribers.join(',');
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
