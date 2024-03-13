import { extension } from 'mime-types';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ALLOWED_EXTENSIONS } from './pipe.constants';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const fileExtension = extension(value.mimetype);

    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      throw new BadRequestException('Wrong file mimetype');
    }

    if (value.fieldname === 'avatar' && value.size > 1000000) {
      throw new BadRequestException('File size is very big');
    }

    return value;
  }
}
