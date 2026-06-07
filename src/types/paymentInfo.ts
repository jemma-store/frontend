import { type PaymentMethodPath } from '@/enums';

export interface IPaymentInfo {
  method: PaymentMethodPath;
  cardType?: 'savedCard' | 'newCard';
  cardData: {
    number: string;
    expiry: string;
    cvv: string;
  };
}