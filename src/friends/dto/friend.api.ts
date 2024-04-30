import { ApiProperty } from '@nestjs/swagger';

export class Friend {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  friend_id: number;
}
