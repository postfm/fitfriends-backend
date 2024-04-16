import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  TrainingGender,
  TypeTraining,
} from 'src/helpers/constants/training.constants';
import {
  LevelOfTrain,
  TimeOfTraining,
} from 'src/helpers/constants/user.constants';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: '' })
  @MaxLength(15, { message: '' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(LevelOfTrain)
  @ApiProperty()
  level: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TypeTraining)
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TimeOfTraining)
  @ApiProperty()
  duration: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0, { message: '' })
  @ApiProperty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1000, { message: '' })
  @Max(5000, { message: '' })
  @ApiProperty()
  calories: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: '' })
  @ApiProperty()
  @MaxLength(140, { message: '' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TrainingGender)
  @ApiProperty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  video: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  rating: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  specialOffer: boolean;
}
