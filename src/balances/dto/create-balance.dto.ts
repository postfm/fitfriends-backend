import { TypeTraining } from './../../helpers/constants/training.constants';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBalanceDto {
  @IsInt()
  @IsNotEmpty()
  @IsEnum(TypeTraining)
  training: string;

  @IsInt()
  amount: number;
}
