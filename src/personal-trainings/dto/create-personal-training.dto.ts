import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PersonalTrainingType } from 'src/helpers/constants/personal-training.constants';

export class CreatePersonalTrainingDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(PersonalTrainingType)
  status: string;
}
