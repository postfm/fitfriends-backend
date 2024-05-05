import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RabbitRouting } from 'src/helpers/types/rabbit-routing.enum';

@Injectable()
export class NotifyService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  public async createTraining(trainer_id: number) {
    return this.rabbitClient.publish(
      'fitfriends.notify.income',
      RabbitRouting.AddTraining,
      trainer_id,
    );
  }
}
