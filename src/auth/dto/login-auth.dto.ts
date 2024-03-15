import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './register-auth.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto extends PartialType(RegisterAuthDto) {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'keks@gmail.com', description: 'Email пользователя' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'The password must not be less than 6 characters' })
  @MaxLength(12, {
    message: 'The password must not be more than 12 characters',
  })
  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  password: string;
}
