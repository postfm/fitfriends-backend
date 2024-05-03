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
  /**
   * Training name
   * @example 'Дневная'
   */
  @IsString()
  @IsOptional()
  @MinLength(1, { message: '' })
  @MaxLength(15, { message: '' })
  name: string;

  /**
   * Background image
   * @example 'upload/photo.jpg'
   */
  @IsString()
  @IsOptional()
  image: string;

  /**
   * User level
   * @example 'любитель'
   */
  @IsString()
  @IsOptional()
  @IsEnum(LevelOfTrain)
  level: string;

  /**
   * Training type
   * @example 'бокс'
   */
  @IsString()
  @IsOptional()
  @IsEnum(TypeTraining)
  type: string;

  /**
   * Training duration
   * @example 80-100 мин
   */
  @IsString()
  @IsOptional()
  @IsEnum(TimeOfTraining)
  duration: string;

  /**
   * Training price
   * @example '120'
   */
  @IsInt()
  @IsOptional()
  @Min(0, { message: '' })
  price: number;

  /**
   * Number of calories
   * @example '2500'
   * @minimum '1000'
   * @maximum '5000'
   */
  @IsInt()
  @IsOptional()
  @Min(1000, { message: '' })
  @Max(5000, { message: '' })
  calories: number;

  /**
   * Training description
   * @example 'Утренняя пробежка'
   * @minimum '10'
   * @maximum '140'
   */
  @IsString()
  @IsOptional()
  @MinLength(10, { message: '' })
  @MaxLength(140, { message: '' })
  description: string;

  /**
   * Gender of the user for whom the training is intended
   * @example 'для всех'
   */
  @IsString()
  @IsOptional()
  @IsEnum(TrainingGender)
  gender: string;

  /**
   * Video file demonstrating training
   * @example 'upload/video.mp4'
   */
  @IsString()
  @IsOptional()
  video: string;

  /**
   * Training Rating
   * @example '4,6'
   * @default '0'
   */
  @IsNumber()
  @IsOptional()
  rating: number;

  /**
   * Special offer sign
   * @example 'true'
   */
  @IsBoolean()
  @IsOptional()
  specialOffer: boolean;
}
