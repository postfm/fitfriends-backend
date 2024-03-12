import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  GenderTypes,
  LevelOfTrain,
  UserLocation,
  UserRoles,
} from 'src/helpers/constants/user.constants';

export class CreateTrainerDto {
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

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: string;

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
  @IsNotEmpty()
  certificates: string;

  @IsString()
  @MinLength(10, {
    message: 'Description should not be less than 10 characters',
  })
  @MaxLength(140, {
    message: 'Description should not be more than 140 characters',
  })
  merits: string;

  @IsBoolean()
  @IsNotEmpty()
  personalTrainings: boolean;
}
