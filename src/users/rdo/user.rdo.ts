import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  gender: string;

  @Expose()
  birthday: Date;

  @Expose()
  role: string;

  @Expose()
  description: string;

  @Expose()
  location: string;

  @Expose()
  image: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  level_of_train: string;

  @Expose()
  type_of_training: string[];

  @Expose()
  time_of_training: string;

  @Expose()
  calories_to_lose: number;

  @Expose()
  calories_per_day: number;

  @Expose()
  ready_to_train: boolean;
}
