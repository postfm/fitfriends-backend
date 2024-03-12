import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export async function getPasswordHash(password: string) {
  const configService = new ConfigService();
  const salt = await bcrypt.genSalt(+configService.get('PASSWORD_SALT'));
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const isCorrect = await bcrypt.compare(password, passwordHash);
  if (!isCorrect) {
    throw new ConflictException('Password is wrong');
  }

  return isCorrect;
}
