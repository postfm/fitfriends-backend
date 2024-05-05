import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RabbitRouting } from 'src/helpers/types/rabbit-routing.enum';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify.income',
    routingKey: RabbitRouting.AddTraining,
    queue: 'fitfriends.notify',
  })
  public async create(trainer_id) {
    this.mailService.newsletter(trainer_id);
  }
}
