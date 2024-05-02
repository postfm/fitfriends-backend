import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSubscriber } from './entities/email-subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailSubscriberService {
  constructor(
    @InjectRepository(EmailSubscriber)
    private readonly emailSubscriberRepository: Repository<EmailSubscriber>,
  ) {}

  public async addSubscriber(subscriber: CreateEmailSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findBy({
      email: email,
    });

    if (existsSubscriber) {
      throw new BadRequestException(
        'A subscriber with this email already exists',
      );
    }

    return this.emailSubscriberRepository.save(
      new EmailSubscriber().populate(subscriber),
    );
  }
}
