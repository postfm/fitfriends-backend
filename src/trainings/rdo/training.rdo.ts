import { Expose } from 'class-transformer';

export class TrainingRdo {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  level: string;

  @Expose()
  type: string;

  @Expose()
  duration: string;

  @Expose()
  price: number;

  @Expose()
  calories: number;

  @Expose()
  description: string;

  @Expose()
  gender: string;

  @Expose()
  video: string;

  @Expose()
  rating: number;

  @Expose()
  trainer: number;

  @Expose()
  specialOffer: boolean;
}
