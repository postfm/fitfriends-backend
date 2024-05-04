import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  /**
   * Subscriber email
   * @example 'subcriber@mail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  subscriber_email: string;
}
