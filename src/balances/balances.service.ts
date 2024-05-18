import { BalanceError } from './../helpers/constants/balance.constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto, user_id: number) {
    const isExist = await this.balanceRepository.findOneBy({
      user: { id: user_id },
    });

    if (isExist) {
      throw new BadRequestException(BalanceError.BalanceAlreadyExists);
    }

    const newBalance = {
      ...createBalanceDto,
      user: { id: user_id },
    };

    return await this.balanceRepository.save(newBalance);
  }

  async findAll(user_id: number) {
    const isExist = await this.balanceRepository.find({
      where: { user: { id: user_id } },
      relations: {
        user: { trainings: true },
      },
    });

    if (!isExist) {
      throw new BadRequestException(BalanceError.DontHaveBalance);
    }

    return this.balanceRepository.find({
      relations: { user: true },
      where: { user: { id: user_id } },
    });
  }

  async update(updateBalanceDto: UpdateBalanceDto, user_id: number) {
    const isExist = await this.balanceRepository.findOneBy({
      user: { id: user_id },
    });

    if (!isExist) {
      throw new BadRequestException(BalanceError.DontHaveBalance);
    }

    const balance_id = isExist.id;

    const newBalance = {
      ...updateBalanceDto,
      user: { id: user_id },
    };
    return this.balanceRepository.update(balance_id, newBalance);
  }
}
