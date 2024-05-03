import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { RabbitRouting } from 'src/helpers/types/rabbit-routing.enum';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.notify.income',
  })
  public async create(subscriber: CreateEmailSubscriberDto) {
    this.emailSubscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
