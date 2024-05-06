import { SortDirection } from './sort-direction.enum';

export enum TypeTraining {
  'йога' = 'йога',
  'бег' = 'бег',
  'бокс' = 'бокс',
  'стретчинг' = 'стретчинг',
  'кроссфит' = 'кроссфит',
  'аэробика' = 'аэробика',
  'пилатес' = 'пилатес',
}

export enum TrainingGender {
  'для женщин' = 'для женщин',
  'для мужчин' = 'для мужчин',
  'для всех' = 'для всех',
}

export const TrainingError = {
  TrainingAlreadyExists: 'This training already exists!',
  TrainingNotExists: `Such training does not exist`,
} as const;

export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORTING_TYPE = 'quantity';
