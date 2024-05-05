import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LengthParameter } from 'src/helpers/constants/common.constant';

export class CreateAlertDto {
  /**
   * Message alert
   * @example `The user Karin changed the status of your application to принят`
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(LengthParameter.minMessage, {
    message: `Text should not be less than ${LengthParameter.minMessage} characters`,
  })
  @MaxLength(LengthParameter.maxMessage, {
    message: `Text should not be more than ${LengthParameter.maxMessage} characters`,
  })
  text: string;

  @IsInt()
  @IsNotEmpty()
  user: number;
}
