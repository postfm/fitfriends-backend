import { extension } from 'mime-types';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ALLOWED_EXTENSIONS } from './pipe.constants';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const { fieldname, size, mimetype } = value;
    const fileExtension = extension(mimetype);

    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      throw new BadRequestException('Wrong file mimetype');
    }
    const maxSize = 10000000;
    if (fieldname === 'avatar' && size > maxSize) {
      throw new BadRequestException('');
    }

    return value;
  }
}
