import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAlertDto {
  /**
   * Message alert
   * @example `The user Karin changed the status of your application to принят`
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Text should not be less than 10 characters',
  })
  @MaxLength(140, {
    message: 'Text should not be more than 140 characters',
  })
  text: string;

  @IsInt()
  @IsNotEmpty()
  user: number;
}
