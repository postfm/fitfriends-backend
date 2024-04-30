import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalTrainingDto } from './create-personal-training.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PersonalTrainingType } from 'src/helpers/constants/personal-training.constants';

export class UpdatePersonalTrainingDto extends PartialType(
  CreatePersonalTrainingDto,
) {
  @IsString()
  @IsNotEmpty()
  @IsEnum(PersonalTrainingType)
  status: string;
}
