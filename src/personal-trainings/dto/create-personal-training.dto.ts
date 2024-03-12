import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PersonalTrainingType } from 'src/helpers/constants/personal-training.constants';

export class CreatePersonalTrainingDto {
  @IsInt()
  @IsNotEmpty()
  initiator: number;

  @IsInt()
  @IsNotEmpty()
  user: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(PersonalTrainingType)
  status: string;
}
