import { extension } from 'mime-types';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  ALLOWED_EXTENSIONS,
  FIELD_NAME,
  MAX_FILE_SIZE,
  PipeError,
} from '../constants/pipe.constants';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const fileExtension = extension(value.mimetype);

    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      throw new BadRequestException(PipeError.WrongFileMimetype);
    }

    if (value.fieldname === FIELD_NAME && value.size > MAX_FILE_SIZE) {
      throw new BadRequestException(PipeError.FileSizeBig);
    }

    return value;
  }
}
