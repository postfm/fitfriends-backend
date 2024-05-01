import { PartialType } from '@nestjs/mapped-types';
import { CreateBalanceDto } from './create-balance.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBalanceDto extends PartialType(CreateBalanceDto) {
  @IsInt()
  @IsNotEmpty()
  /**
   * 'Number of purchased workouts'
   * @example '5'
   */
  amount: number;
}
