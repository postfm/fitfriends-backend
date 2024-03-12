import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    const alert = await this.alertRepository.save(this.toPOJO(createAlertDto));
    return alert;
  }

  findAll() {
    return `This action returns all alerts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    return `This action updates a #${id} alert`;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }

  toPOJO(entity: CreateAlertDto) {
    return {
      text: entity.text,
      user: entity.user,
    };
  }
}
