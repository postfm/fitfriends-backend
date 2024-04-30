import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PersonalTrainingType } from 'src/helpers/constants/personal-training.constants';

export class CreatePersonalTrainingDto {
  /**
   * Personal training application status
   * @example 'на рассмотрении'
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(PersonalTrainingType)
  status: string;
}
