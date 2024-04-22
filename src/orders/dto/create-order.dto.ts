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
  @Min(1, { message: '' })
  @Max(50, { message: '' })
  amount: number;

  @IsNumber()
  sum: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TypePay)
  pay: string;
}
