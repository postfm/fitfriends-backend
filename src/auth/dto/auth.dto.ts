import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LengthParameter } from 'src/helpers/constants/common.constant';

export class AuthDto {
  /**
   * User email
   * @example 'user@mail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User password
   * @example '123678'
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(LengthParameter.minPassword, {
    message: `The password must contain at least ${LengthParameter.minPassword} characters`,
  })
  @MaxLength(LengthParameter.maxPassword, {
    message: `The password must contain no more than ${LengthParameter.maxPassword} characters`,
  })
  password: string;
}
