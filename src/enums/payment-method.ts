const PaymentMethod = {
  ONDELIVERY : 'ON_DELIVERY',
  CARD: 'BY_CARD',
  PRIVATE: 'IN_INSTALLMENTS_PRIVATBANK',
  MONO: 'IN_INSTALLMENTS_MONOBANK',
  GIFT: 'GIFT_CERTIFICATE',
} as const;

export type PaymentMethodPath = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export { PaymentMethod };