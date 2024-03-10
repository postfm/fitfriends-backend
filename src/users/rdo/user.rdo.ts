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
  levelOfTrain: string;

  @Expose()
  typeOfTraining: string[];

  @Expose()
  timeOfTraining: string;

  @Expose()
  caloriesToLose: number;

  @Expose()
  caloriesPerDay: number;

  @Expose()
  readyToTrain: boolean;
}
