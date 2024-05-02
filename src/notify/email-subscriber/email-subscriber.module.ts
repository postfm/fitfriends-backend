import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';

@Module({
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService],
})
export class EmailSubscriberModule {}
