export const ALLOWED_EXTENSIONS = [
  'jpeg',
  'jpg',
  'png',
  'mov',
  'mp4',
  'avi',
  'pdf',
];

export const PipeError = {
  WrongFileMimetype: 'Wrong file mimetype',
  FileSizeBig: 'File size is very big',
} as const;

export const FIELD_NAME = 'avatar';
export const MAX_FILE_SIZE = 1000000;
