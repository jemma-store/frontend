import { Card, CardContent } from '@/components/ui';
import { ContactsForm } from './ContactsForm';
import { DeliveryForm } from './DeliveryForm';
import { GiftCheckbox } from './GiftCheckbox';
import { PaymentForm } from './PaymentForm';

export const Details = () => {
  return (
    <div className="flex flex-col w-full gap-12 md:gap-8">
      <Card className="bg-main font-main md:pt-8 lg:pt-21">
        <CardContent className="flex flex-col items-start pt-6 gap-7 md:shadow-[4px_0px_10px_rgba(0,0,0,0.2)] md:p-5">
          <h2 className="font-medium text-[20px]">Ваші дані</h2>

          <ContactsForm />

          <GiftCheckbox />
        </CardContent>
      </Card>

      <Card className="bg-main">
        <CardContent className="flex flex-col items-start gap-7 md:shadow-[4px_0px_10px_rgba(0,0,0,0.2)] md:p-5">
          <div className="flex flex-col items-start gap-7 w-full md:pt-0">
            <h2 className="font-body text-brown-dark font-medium text-second">Доставка</h2>

            <DeliveryForm />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-main">
        <CardContent className=" flex flex-col items-start gap-7 md:shadow-[4px_0px_10px_rgba(0,0,0,0.2)] md:p-5">
          <h2 className="font-body text-brown-dark font-medium text-second">Оплата</h2>
          
          <PaymentForm />
        </CardContent>
      </Card>
    </div>
  );
};
