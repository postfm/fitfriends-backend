import { BadRequestException, Injectable } from '@nestjs/common';
import { Alert } from './entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LIMIT_ALERTS_PER_PAGE } from './alert-constants';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(user_id: number) {
    return this.dataSource
      .getRepository(Alert)
      .createQueryBuilder('alert')
      .where('alert.user=:id', { id: user_id })
      .limit(LIMIT_ALERTS_PER_PAGE)
      .orderBy({
        created_at: 'DESC',
      })
      .getMany();
  }

  async remove(id: number) {
    const isExist = await this.alertRepository.findOneBy({
      id: id,
    });

    if (!isExist) {
      throw new BadRequestException("Alert didn't found");
    }
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Alert)
      .where('id=:id', { id: id })
      .execute();
  }
}
