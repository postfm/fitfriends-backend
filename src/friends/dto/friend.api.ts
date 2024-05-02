import { ApiProperty } from '@nestjs/swagger';

export class Friend {
  @ApiProperty({
    description: 'Primary key',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'User primary key',
    example: '1',
  })
  user_id: number;

  @ApiProperty({
    description: 'Friend primary key',
    example: '2',
  })
  friend_id: number;
}
