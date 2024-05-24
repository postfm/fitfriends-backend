import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TypeOrder, TypePay } from 'src/helpers/constants/order.constants';
import { AmountValue } from './create-order.constant';

export class UpdateOrderDto {
  /**
   * Training type
   * @example 'бег'
   */
  @IsString()
  @IsOptional()
  @IsEnum(TypeOrder)
  type?: string;

  /**
   * Training price
   * @example '120'
   */
  @IsNumber()
  @IsOptional()
  price?: number;

  /**
   * Number of purchased workouts
   * @example '10'
   */
  @IsInt()
  @IsNotEmpty()
  @Min(AmountValue.updateMinValue, {
    message: `The value must not be less than ${AmountValue.updateMinValue}`,
  })
  @Max(AmountValue.maxValue, {
    message: `The value should not be more than ${AmountValue.maxValue}`,
  })
  amount: number;

  @IsString()
  @IsOptional()
  @IsEnum(TypePay)
  /**
   * Payment system type
   * @example 'mir'
   */
  pay?: string;
}
