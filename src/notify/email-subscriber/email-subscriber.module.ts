import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSubscriber } from './entities/email-subscriber.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from 'src/helpers/brokers';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailSubscriber]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    ),
    MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService],
})
export class EmailSubscriberModule {}
