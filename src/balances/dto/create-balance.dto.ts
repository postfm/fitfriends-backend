import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBalanceDto {
  @IsInt()
  @IsNotEmpty()
  amount: number;
}
