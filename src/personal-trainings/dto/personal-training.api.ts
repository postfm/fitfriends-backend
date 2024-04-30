import { ApiProperty } from '@nestjs/swagger';

export class PersonalTraining {
  @ApiProperty()
  id: number;

  @ApiProperty()
  initiator: number;

  @ApiProperty()
  user: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  cratedAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
