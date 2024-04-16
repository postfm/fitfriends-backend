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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
  @IsString()
  @IsOptional()
  @MinLength(1, { message: '' })
  @MaxLength(15, { message: '' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @IsEnum(LevelOfTrain)
  @ApiProperty()
  level: string;

  @IsString()
  @IsOptional()
  @IsEnum(TypeTraining)
  @ApiProperty()
  type: string;

  @IsString()
  @IsOptional()
  @IsEnum(TimeOfTraining)
  @ApiProperty()
  duration: string;

  @IsInt()
  @IsOptional()
  @Min(0, { message: '' })
  @ApiProperty()
  price: number;

  @IsInt()
  @IsOptional()
  @Min(1000, { message: '' })
  @Max(5000, { message: '' })
  @ApiProperty()
  calories: number;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: '' })
  @MaxLength(140, { message: '' })
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @IsEnum(TrainingGender)
  @ApiProperty()
  gender: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  video: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  rating: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  specialOffer: boolean;
}
