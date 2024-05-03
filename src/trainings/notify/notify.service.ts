import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from 'src/helpers/types/rabbit-routing.enum';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import rabbitConfig from './rabbit.config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbiOptions.exchange as string,
      RabbitRouting.AddSubscriber,
      { ...dto },
    );
  }
}
