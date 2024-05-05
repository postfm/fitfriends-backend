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
import { LengthParameter } from 'src/helpers/constants/common.constant';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
  /**
   * Training name
   * @example 'Дневная'
   */
  @IsString()
  @IsOptional()
  @MinLength(LengthParameter.minName, {
    message: `The name cannot be less than ${LengthParameter.minName} characters`,
  })
  @MaxLength(LengthParameter.maxName, {
    message: `The name cannot be less than ${LengthParameter.maxName} characters`,
  })
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
  @Min(LengthParameter.minCalories, {
    message: `The number of calories cannot be less than ${LengthParameter.minCalories}`,
  })
  @Max(LengthParameter.maxCalories, {
    message: `The number of calories cannot be more than ${LengthParameter.maxCalories}`,
  })
  calories: number;

  /**
   * Training description
   * @example 'Утренняя пробежка'
   * @minimum '10'
   * @maximum '140'
   */
  @IsString()
  @IsOptional()
  @MinLength(LengthParameter.minMessage, {
    message: `The description cannot be less than ${LengthParameter.minMessage} characters`,
  })
  @MaxLength(LengthParameter.maxMessage, {
    message: `The name cannot be less than ${LengthParameter.maxMessage} characters`,
  })
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
