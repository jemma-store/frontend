const PaymentMethod = {
  ONDELIVERY : 'ON_DELIVERY',
  CARD: 'LIQPAY',
} as const;

export type PaymentMethodPath = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export { PaymentMethod };