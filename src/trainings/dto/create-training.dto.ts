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
import { LengthParameter } from 'src/helpers/constants/common.constant';
import {
  TrainingGender,
  TypeTraining,
} from 'src/helpers/constants/training.constants';
import {
  LevelOfTrain,
  TimeOfTraining,
} from 'src/helpers/constants/user.constants';

export class CreateTrainingDto {
  /**
   * Training name
   * @example 'Дневная'
   */
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  image: string;

  /**
   * User level
   * @example 'любитель'
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(LevelOfTrain)
  level: string;

  /**
   * Training type
   * @example 'бокс'
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(TypeTraining)
  type: string;

  /**
   * Training duration
   * @example 80-100 мин
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(TimeOfTraining)
  duration: string;

  /**
   * Training price
   * @example '120'
   */
  @IsInt()
  @IsNotEmpty()
  price: number;

  /**
   * Number of calories
   * @example '2500'
   * @minimum '1000'
   * @maximum '5000'
   */
  @IsInt()
  @IsNotEmpty()
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
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsEnum(TrainingGender)
  gender: string;

  /**
   * Video file demonstrating training
   * @example 'upload/video.mp4'
   */
  @IsString()
  @IsNotEmpty()
  video: string;

  /**
   * Training Rating
   * @example '4,6'
   * @default '0'
   */
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  /**
   * Special offer sign
   * @example 'true'
   */
  @IsBoolean()
  @IsNotEmpty()
  specialOffer: boolean;
}
