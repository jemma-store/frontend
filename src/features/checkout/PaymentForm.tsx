import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui';
import { IFormSchema } from '@/schemas/formSchema';

const paymentMethods = [
  { id: 'LIQPAY', label: 'Оплата карткою онлайн (LiqPay)' },
  { id: 'ON_DELIVERY', label: 'Післяплата Нова Пошта' },
];

export const PaymentForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormSchema>();

  return (
    <div className="flex flex-col items-start gap-7 w-full">
      <Controller
        name="paymentInfo.method" 
        control={control}
        render={({ field }) => (
          <RadioGroup
            className="w-full space-y-7"
            value={field.value}
            onValueChange={field.onChange}
          >
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  className="w-5 h-5 rounded-[10px] border-[0.5px] border-grey"
                />
                <label 
                  htmlFor={method.id} 
                  className="text-brown-dark text-[16px] w-full flex justify-between cursor-pointer"
                >
                  <span>{method.label}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {errors.paymentInfo?.method && (
        <p className="text-sm text-red-500 mt-1">{errors.paymentInfo.method.message}</p>
      )}
    </div>
  );
};