import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TrainingRdo {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  image: string;

  @Expose()
  @ApiProperty()
  level: string;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  duration: string;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  calories: number;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  gender: string;

  @Expose()
  @ApiProperty()
  video: string;

  @Expose()
  @ApiProperty()
  rating: number;

  @Expose()
  @ApiProperty()
  specialOffer: boolean;
}
