import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
    private readonly mailService: MailService,
  ) {}
  async create(
    subscriber_id: number,
    trainer_id: number,
    createSubscriberDto: CreateSubscriberDto,
  ) {
    const isExist = await this.subscriberRepository.findOneBy({
      subscriber_id: subscriber_id,
      trainer_id: trainer_id,
    });

    if (isExist) {
      throw new BadRequestException('You are already subscribed!');
    }

    const newSubscriber = {
      ...createSubscriberDto,
      subscriber_id,
      trainer_id,
    };

    this.mailService.example();

    return this.subscriberRepository.save(newSubscriber);
  }

  async findAll(trainer_id: number) {
    const isExist = await this.subscriberRepository.findBy({
      trainer_id: trainer_id,
    });

    if (!isExist.length) {
      throw new BadRequestException('You have no subscribers');
    }

    return this.subscriberRepository.findBy({
      trainer_id: trainer_id,
    });
  }

  async remove(subscriber_id: number, trainer_id: number) {
    const isExist = await this.subscriberRepository.findOneBy({
      subscriber_id: subscriber_id,
      trainer_id: trainer_id,
    });

    if (!isExist) {
      throw new BadRequestException('You are not subscribed to this coach');
    }
    return this.subscriberRepository.delete({
      subscriber_id,
      trainer_id,
    });
  }
}
