import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
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
  UserRoles,
} from '../../helpers/constants/user.constants';
import { LengthParameter } from 'src/helpers/constants/common.constant';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(LengthParameter.minName, {
    message: `The name must not be less than ${LengthParameter.minName} character`,
  })
  @MaxLength(LengthParameter.maxName, {
    message: `The name must not be more than ${LengthParameter.maxName} characters`,
  })
  name: string;

  /**
   * E-mail address
   * @example 'john@mail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User avatar
   * @example 'upload/avatar.jpg'
   */
  @IsString()
  @IsOptional()
  avatar?: string;

  /**
   * User password
   * @example '123456'
   * @minimum '6'
   * @maximum '12'
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(LengthParameter.minPassword, {
    message: `The password must not be less than ${LengthParameter.minPassword} characters`,
  })
  @MaxLength(LengthParameter.maxPassword, {
    message: 'The password must not be more than 12 characters',
  })
  password: string;

  /**
   * User gender
   * @example 'мужской'
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(GenderTypes)
  gender: string;

  /**
   * Date of Birth
   * @example '2000-18-01'
   */
  @IsDateString()
  @IsOptional()
  birthday?: Date;

  /**
   * Роль пользователя в системе
   * @example 'тренер'
   */
  @IsArray()
  @IsNotEmpty()
  @IsEnum(UserRoles, { each: true })
  roles: string[];

  /**
   * Text with general information
   * @example 'Описание пользователя'
   * @minimum 10
   * @maximum 140
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(LengthParameter.minMessage, {
    message: `Description should not be less than ${LengthParameter.minMessage} characters`,
  })
  @MaxLength(LengthParameter.maxMessage, {
    message: `Description should not be more than ${LengthParameter.maxMessage} characters`,
  })
  description: string;

  /**
   * Metro station
   * @example 'Пионерская'
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserLocation)
  location: string;

  /**
   * Фоновая картинка для карточки пользователя
   * @example 'upload/background-image.jpg
   */
  @IsString()
  @IsNotEmpty()
  image: string;

  /**
   * User's fitness level
   * @example 'любитель'
   */
  @IsString()
  @IsEnum(LevelOfTrain)
  @IsNotEmpty()
  levelOfTrain: string;

  /**
   * Training type
   * @example ['йога','бег']
   */
  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(3, {
    message: 'The number of workouts should not be more than 3',
  })
  typeOfTraining: string[];

  /**
   * Time of training (only for user)
   * @example '10-30 мин'
   */
  @IsString()
  @IsOptional()
  @IsEnum(TimeOfTraining)
  timeOfTraining: string;

  /**
   * Number of calories to lose (only for user)
   * @example '3000'
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
  caloriesToLose: number;

  /**
   * Number of calories to burn per day (only for user)
   * @example '2300'
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
  caloriesPerDay: number;

  /**
   * Flag of user readiness for training invitations (only for user)
   * @example 'true'
   */
  @IsBoolean()
  @IsOptional()
  readyToTrain: boolean;

  /**
   * Trainer certificate, pdf file (only trainer)
   * @example 'upload/certificate.pdf'
   */
  @IsString()
  @IsOptional()
  certificates: string;

  /**
   * Text describing the coach's merits (only trainer)
   * @example 'Кандидат в мастера спорта'
   */
  @IsString()
  @IsOptional()
  merits: string;

  /**
   * Flag of readiness to conduct individual training (only trainer)
   * @example 'false'
   */
  @IsBoolean()
  @IsOptional()
  personalTrainings: boolean;
}
