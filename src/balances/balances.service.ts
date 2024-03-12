import { Injectable } from '@nestjs/common';
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

  async create(createBalanceDto: CreateBalanceDto) {
    const balance = await this.balanceRepository.save(
      this.toPOJO(createBalanceDto),
    );
    return balance;
  }

  findAll() {
    return `This action returns all balances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return `This action updates a #${id} balance`;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }

  toPOJO(entity: CreateBalanceDto) {
    return {
      training: entity.training,
      amount: entity.amount,
    };
  }
}
