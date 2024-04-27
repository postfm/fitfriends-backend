import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  GenderTypes,
  LevelOfTrain,
  TimeOfTraining,
  UserLocation,
} from 'src/helpers/constants/user.constants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'The name must not be less than 1 character' })
  @MaxLength(15, { message: 'The name must not be more than 15 characters' })
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  @IsEnum(GenderTypes)
  gender?: string;

  @IsDateString()
  @IsOptional()
  birthday?: Date;

  @IsString()
  @IsOptional()
  @MinLength(10, {
    message: 'Description should not be less than 10 characters',
  })
  @MaxLength(140, {
    message: 'Description should not be more than 140 characters',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @IsEnum(UserLocation)
  location?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsEnum(LevelOfTrain)
  @IsOptional()
  levelOfTrain?: string;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(3, {
    message: 'The number of workouts should not be more than 3',
  })
  typeOfTraining?: string[];

  @IsString()
  @IsOptional()
  @IsEnum(TimeOfTraining)
  timeOfTraining?: string;

  @IsInt()
  @IsOptional()
  @Min(1000)
  @Max(5000)
  caloriesToLose?: number;

  @IsInt()
  @IsOptional()
  @Min(1000)
  @Max(5000)
  caloriesPerDay?: number;

  @IsBoolean()
  @IsOptional()
  readyToTrain?: boolean;

  @IsString()
  @IsOptional()
  certificates?: string;

  @IsString()
  @IsOptional()
  merits?: string;

  @IsBoolean()
  @IsOptional()
  personalTrainings?: boolean;

  @IsOptional()
  refreshToken?: string;
}
