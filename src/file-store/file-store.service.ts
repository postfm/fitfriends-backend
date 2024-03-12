import { ConfigService } from '@nestjs/config';
import 'multer';
import { Injectable } from '@nestjs/common';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import * as dayjs from 'dayjs';
import { unlink } from 'node:fs';

@Injectable()
export class FileStoreService {
  constructor(private readonly configService: ConfigService) {}

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const staticDirectory = this.configService.get('STATIC_ROOT');

    return join(staticDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    const directory = this.configService.get('UPLOAD_DIRECTORY_PATH');
    return join(directory, this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);

      const destinationFile = this.getDestinationFilePath(
        `${filename}.${fileExtension}`,
      );

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return `${this.getUploadDirectoryPath()}${filename}.${fileExtension}`;
    } catch (error) {
      throw new Error(`Can't save file`);
    }
  }

  public deleteFile(file: string): void {
    unlink(file, (err) => {
      if (err) {
      } else {
        console.log(`${file} was deleted`);
      }
    });
  }
}
