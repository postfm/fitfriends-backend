import { RegisterAuthDto } from './../../auth/dto/register-auth.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(RegisterAuthDto) {}
