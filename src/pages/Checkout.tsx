import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IFormSchema } from '@/types/';
import { checkoutSchema } from '@/schemas';
import { DeliveryMethod, PaymentMethod } from '@/enums';
import { CheckoutForm } from '@/features/checkout/CheckoutForm';
import { ArrowLeft } from '@/assets/icons/ArrowLeft';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {

  const navigate = useNavigate()

  const methods = useForm<IFormSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        fatherName: '',
        phone: '',
        email: '',
        isGift: false,
      },
      deliveryInfo: {
        city: '',
        method: DeliveryMethod.COURIER,
      },
      paymentInfo: {
        method: PaymentMethod.CARD,
        cardData: {
          number: '',
          expiry: '',
          cvv: '',
        },
      },
    },
  });

  return (
    <div className="container md:px-14 flex flex-col mt-[100px] section-indent leading-[130%]">

      <button
        onClick={() => navigate(-1)}
        className='flex items-center leading-none gap-1 text-[16px] font-medium md:hidden'>
          <ArrowLeft />
          <span>Назад</span>
      </button>

      <h2 className="pt-8 text-center text-[20px] font-normal md:text-start lg:pt-10 lg:text-[54px]">Оформлення замовлення</h2>

      <div className="w-full">
        <FormProvider {...methods}>
          <CheckoutForm methods={methods} />
        </FormProvider>
      </div>
    </div>
  );
};
