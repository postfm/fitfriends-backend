import { Injectable } from '@nestjs/common';
import { Alert } from './entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(user_id: number) {
    return this.alertRepository.findBy({
      user: user_id,
    });
  }

  async remove(id: number) {
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Alert)
      .where('id=:id', { id: id })
      .execute();
  }
}
