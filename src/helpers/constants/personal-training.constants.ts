export enum PersonalTrainingType {
  'на рассмотрении' = 'на рассмотрении',
  'отклонён' = 'отклонён',
  'принят' = 'принят',
}

export const PersonalTrainingError = {
  CanNotInvite:
    'You can not invite yourself to training, you can only force it.',
  RequestNotCreated: 'Personal training request not created',
  TrainingNotExists: 'No such training exists',
} as const;
export const REQUEST_PERSONAL_TRAINING =
  ' submitted a request for personal (joint) training ';
export const CHANGE_STATUS = ' changed the status of your application to ';
