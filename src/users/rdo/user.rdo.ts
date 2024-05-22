import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  avatar: string;

  @Expose()
  @ApiProperty()
  gender: string;

  @Expose()
  @ApiProperty()
  birthday: Date;

  @Expose()
  @ApiProperty()
  roles: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty()
  image: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  levelOfTrain: string;

  @Expose()
  @ApiProperty()
  typeOfTraining: string[];

  @Expose()
  @ApiProperty()
  timeOfTraining: string;

  @Expose()
  @ApiProperty()
  caloriesToLose: number;

  @Expose()
  @ApiProperty()
  caloriesPerDay: number;

  @Expose()
  @ApiProperty()
  readyToTrain: boolean;

  @Expose()
  @ApiProperty()
  certificates: string;

  @Expose()
  @ApiProperty()
  merits: string;

  @Expose()
  @ApiProperty()
  personalTrainings: boolean;

  @Expose()
  @ApiProperty()
  refreshToken: string;

  @Expose()
  @ApiProperty()
  friends: number[];
}
