export const personalFields = [
  { id: 'firstName', label: "Ім'я" },
  { id: 'lastName', label: 'Прізвище' },
  { id: 'fatherName', label: 'По-батькові' },
  { id: 'phone', label: 'Номер телефону' },
  { id: 'email', label: 'Електронна пошта' },
];

export const deliveryMethods = [
  { id: 'NOVA_POST_COURIER', label: "Кур'єр Нова Пошта", price: 'Безкоштовно' },
  { id: 'NOVA_POST_PARCEL_LOCKER', label: 'Поштомат Нова Пошта', price: 'Безкоштовно' },
  { id: 'NOVA_POST_DEPARTMENT', label: 'Відділення Нова Пошта', price: 'Безкоштовно' },
];

export const paymentMethods = [
  { id: 'ON_DELIVERY', label: 'Оплата при отриманні' },
  { id: 'BY_CARD', label: 'Оплата платіжною картою VISA/Mastercard' },
  { id: 'IN_INSTALLMENTS_PRIVATBANK', label: 'Оплата частинами ПриватБанк' },
  { id: 'IN_INSTALLMENTS_MONOBANK', label: 'Оплата частинами Monobank' },
  { id: 'GIFT_CERTIFICATE', label: 'Подарунковий сертифікат' },
];
