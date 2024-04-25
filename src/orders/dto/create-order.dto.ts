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
  @IsString()
  @IsNotEmpty()
  @IsEnum(TypeOrder)
  type: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

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
  pay: string;
}
