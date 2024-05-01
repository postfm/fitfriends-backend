import { IsString } from 'class-validator';

export class FileDeleteDto {
  /**
   * 'Path to the file to be deleted'
   * @example '/web-projects/fitfriends/fitfriends-backend/src/file-store'
   */
  @IsString()
  filePath: string;
}
