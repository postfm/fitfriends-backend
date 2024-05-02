import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
  ) {}
}
