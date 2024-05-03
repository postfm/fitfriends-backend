import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
} from 'src/notify/email-subscriber/email-subscriber.constant';

export class CreateSubscriberDto {
  /**
   * User primary key
   * @example '4'
   */
  @IsInt()
  @IsNotEmpty()
  public user_id: number;

  /**
   * Trainer primary key
   * @example '8'
   */
  @IsInt()
  @IsNotEmpty()
  public trainer_id: number;
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
