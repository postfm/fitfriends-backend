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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'The name must not be less than 1 character' })
  @MaxLength(15, { message: 'The name must not be more than 15 characters' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'The password must not be less than 6 characters' })
  @MaxLength(12, {
    message: 'The password must not be more than 12 characters',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(GenderTypes)
  gender: string;

  @IsDateString()
  @IsOptional()
  birthday?: Date;

  @IsArray()
  @IsNotEmpty()
  @IsEnum(UserRoles, { each: true })
  roles: string[];

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Description should not be less than 10 characters',
  })
  @MaxLength(140, {
    message: 'Description should not be more than 140 characters',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserLocation)
  location: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsEnum(LevelOfTrain)
  @IsNotEmpty()
  levelOfTrain: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(3, {
    message: 'The number of workouts should not be more than 3',
  })
  typeOfTraining: string[];

  @IsString()
  @IsOptional()
  @IsEnum(TimeOfTraining)
  timeOfTraining: string;

  @IsInt()
  @IsOptional()
  @Min(1000)
  @Max(5000)
  caloriesToLose: number;

  @IsInt()
  @IsOptional()
  @Min(1000)
  @Max(5000)
  caloriesPerDay: number;

  @IsBoolean()
  @IsOptional()
  readyToTrain: boolean;

  @IsString()
  @IsOptional()
  certificates: string;

  @IsString()
  @IsOptional()
  merits: string;

  @IsBoolean()
  @IsOptional()
  personalTrainings: boolean;
}
