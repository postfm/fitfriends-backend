import { ApiProperty } from '@nestjs/swagger';

export class PersonalTraining {
  @ApiProperty({
    description: 'Primary key',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Initiator primary key',
    example: '1',
  })
  initiator: number;

  @ApiProperty({
    description: 'User primary key',
    example: '1',
  })
  user: number;

  @ApiProperty({
    description: 'Personal training application status',
    example: 'принят',
  })
  status: string;

  @ApiProperty({
    description: 'Date of creation of the request for personal training',
    example: '2024-14-04',
  })
  cratedAt: Date;

  @ApiProperty({
    description:
      'Date of update of the application status for personal training',
    example: '2024-14-04',
  })
  updatedAt: Date;
}
