import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingDto } from './create-training.dto';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  LevelOfTrain,
  TimeOfTraining,
} from 'src/helpers/constants/user.constants';
import {
  TrainingGender,
  TypeTraining,
} from 'src/helpers/constants/training.constants';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
  @IsString()
  @IsOptional()
  @MinLength(1, { message: '' })
  @MaxLength(15, { message: '' })
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  @IsEnum(LevelOfTrain)
  level: string;

  @IsString()
  @IsOptional()
  @IsEnum(TypeTraining)
  type: string;

  @IsString()
  @IsOptional()
  @IsEnum(TimeOfTraining)
  duration: string;

  @IsInt()
  @IsOptional()
  @Min(0, { message: '' })
  price: number;

  @IsInt()
  @IsOptional()
  @Min(1000, { message: '' })
  @Max(5000, { message: '' })
  calories: number;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: '' })
  @MaxLength(140, { message: '' })
  description: string;

  @IsString()
  @IsOptional()
  @IsEnum(TrainingGender)
  gender: string;

  @IsString()
  @IsOptional()
  video: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsBoolean()
  @IsOptional()
  specialOffer: boolean;
}
