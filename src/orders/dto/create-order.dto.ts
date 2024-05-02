import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TypeOrder, TypePay } from 'src/helpers/constants/order.constants';
import { AmountValue } from './create-order.constant';

export class CreateOrderDto {
  /**
   * Training type
   * @example 'бег'
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(TypeOrder)
  type: string;

  /**
   * Training price
   * @example '120'
   */
  @IsNumber()
  @IsNotEmpty()
  price: number;

  /**
   * Number of purchased workouts
   * @example '10'
   */
  @IsInt()
  @IsNotEmpty()
  @Min(AmountValue.minValue, { message: 'The value must not be less than 1' })
  @Max(AmountValue.maxValue, {
    message: 'The value should not be more than 50',
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TypePay)
  /**
   * Payment system type
   * @example 'mir'
   */
  pay: string;
}
