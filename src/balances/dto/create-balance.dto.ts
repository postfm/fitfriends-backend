import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBalanceDto {
  /**
   * 'Number of purchased workouts'
   * @example '4'
   */
  @IsInt()
  @IsNotEmpty()
  amount: number;
}
