import { SortDirection } from '../types/sort-direction.interface';

export enum GenderTypes {
  'женский' = 'женский',
  'мужской' = 'мужской',
  'неважно' = 'неважно',
}

export enum UserRoles {
  'тренер' = 'тренер',
  'пользователь' = 'пользователь',
}

export enum UserLocation {
  'Пионерская' = 'Пионерская',
  'Петроградская' = 'Петроградская',
  'Удельная' = 'Удельная',
  'Звёздная' = 'Звёздная',
  'Спортивная' = 'Спортивная',
}

export enum LevelOfTrain {
  'новичок' = 'новичок',
  'любитель' = 'любитель',
  'профессионал' = 'профессионал',
}

export enum TimeOfTraining {
  '10-30 мин' = '10-30 мин',
  '30-50 мин' = '30-50 мин',
  '50-80 мин' = '50-80 мин',
  '80-100 мин' = '80-100 мин',
}

export const DefaultValue = {
  UsersCountLimit: 50,
  SortDirection: SortDirection.Desc,
  PageCount: 1,
  SortType: 'role',
};
