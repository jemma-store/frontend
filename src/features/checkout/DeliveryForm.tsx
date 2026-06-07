import { Controller, useFormContext } from 'react-hook-form';

import { deliveryMethods } from '@/constants/checkoutOptions';
import { Input, RadioGroup, RadioGroupItem } from '@/components/ui';
import { IFormSchema } from '@/schemas/formSchema';

export const DeliveryForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IFormSchema>();

  return (
    <>
      <div className="w-full relative flex items-center border-b-2 border-grey bg-transparent rounded-none leading-[130%] focus-within:border-brown-dark focus-within:text-brown-dark">
        <Input
          id='city'
          className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
          placeholder="Вкажіть місто"
          {...register('deliveryInfo.city', { required: 'Місто обовʼязкове' })}
        />
        {errors.deliveryInfo?.city && (
          <p className="text-sm text-red-500">{errors.deliveryInfo.city.message}</p>
        )}
      </div>

      <fieldset className="flex flex-col w-full">
        <h2 className="font-body text-brown-dark font-medium text-second pb-8">Способи доставки</h2>

        <Controller
          name="deliveryInfo.method"
          control={control}
          render={({ field }) => (
            <RadioGroup
              className="w-full space-y-7 "
              value={field.value}
              onValueChange={field.onChange}
            >
              {deliveryMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className="w-5 h-5 rounded-[10px] border-[0.5px] border-grey"
                  />
                  <label 
                    htmlFor={method.id} 
                    className=" text-brown-dark text-[16px] w-full flex justify-between">
                    <span>
                      {method.label}
                    </span>
                    <span className='text-[#727272]'> 
                      {method.price}
                    </span>
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.deliveryInfo?.method && (
          <p className="text-sm text-red-500 mt-1">{errors.deliveryInfo.method.message}</p>
        )}
      </fieldset>
    </>
  );
};
