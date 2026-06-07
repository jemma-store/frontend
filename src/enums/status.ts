const Status = {
  PENDING: 'loading',
  FULFILLED: 'fulfilled',
  REJECT: 'error',
  IDLE: 'idle',
} as const;

export type StatusPath = (typeof Status)[keyof typeof Status];

export { Status };