import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
} from '../email-subscriber.constant';

export class CreateEmailSubscriberDto {
  /**
   * User email,
   * @example 'user@mail.com`
   */
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  /**
   * User name
   * @example 'Sara'
   */
  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public name: string;
}
