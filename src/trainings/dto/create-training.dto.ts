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
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(LevelOfTrain)
  level: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TypeTraining)
  type: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TimeOfTraining)
  duration: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0, { message: '' })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1000, { message: '' })
  @Max(5000, { message: '' })
  calories: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: '' })
  @MaxLength(140, { message: '' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TrainingGender)
  gender: string;

  @IsString()
  @IsNotEmpty()
  video: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsBoolean()
  @IsNotEmpty()
  specialOffer: boolean;
}
