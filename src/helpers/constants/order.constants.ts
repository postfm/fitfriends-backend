export enum TypeOrder {
  'абонемент' = 'абонемент',
}

export enum TypePay {
  'visa' = 'visa',
  'mir' = 'mir',
  'umoney' = 'umoney',
}

export const OrderError = {
  OrderAlreadyExists: 'This order already exists!',
  OrderNotExists: `Such order does not exist`,
} as const;

export const ORDER_ALREADY_EXISTS = 'This order already exists!';
export const AMOUNT_DECREMENT = -1;
