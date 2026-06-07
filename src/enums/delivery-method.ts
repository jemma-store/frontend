const DeliveryMethod = {
  COURIER : 'NOVA_POST_COURIER',
  POSTAMAT: 'NOVA_POST_PARCEL_LOCKER',
  OFFICE: 'NOVA_POST_DEPARTMENT',
} as const;

export type DeliveryMethodPath = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export { DeliveryMethod };