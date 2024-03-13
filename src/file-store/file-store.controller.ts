import 'multer';
import { Express } from 'express';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStoreService } from './file-store.service';
import { FileDeleteDto } from './dto/delete-file.dto';
import { FileTypeValidationPipe } from 'src/helpers/pipes/file-validation.pipe';

@Controller('files')
export class FileStoreController {
  constructor(private readonly fileStoreService: FileStoreService) {}

  @Post('/upload/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(
    @UploadedFile(FileTypeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.fileStoreService.saveFile(file);
  }

  @Post('/upload/image')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadImage(
    @UploadedFile(FileTypeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.fileStoreService.saveFile(file);
  }

  @Post('/upload/video')
  @UseInterceptors(FileInterceptor('video'))
  public async uploadVideo(
    @UploadedFile(FileTypeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.fileStoreService.saveFile(file);
  }

  @Post('/upload/certificate')
  @UseInterceptors(FileInterceptor('certificate'))
  public async uploadCertificate(
    @UploadedFile(FileTypeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.fileStoreService.saveFile(file);
  }

  @Post('delete')
  public async deleteFile(@Body() filePath: FileDeleteDto) {
    return this.fileStoreService.deleteFile(filePath.filePath);
  }
}
