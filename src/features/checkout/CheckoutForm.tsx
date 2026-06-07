import { useCheckoutHandler } from '@/lib/hooks/useCheckoutHandler';
import { Details } from '@/features/checkout/Details';
import { Summary } from '@/features/checkout/Summary';
import { HeaderCheckout } from './HeaderCheckout';
import { FieldErrors } from 'react-hook-form';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckoutForm = ({ methods }: { methods: any }) => {

  const {handleSubmit : handleFormSubmit} = methods;

  const { getValues, formState } = methods;

  const { onOrderConfirmed } = useCheckoutHandler({
    getValues,
    formState
  });

  const {isMobile} = useWindowWidth()

  return (
    <div className="flex flex-col items-start">

      <form 
        className="w-full flex flex-col items-start justify-between md:flex-row gap-8"
        onSubmit={handleFormSubmit(onOrderConfirmed, (errors : FieldErrors) => {
        console.log("Помилки валідації:", errors);
      })}
        >

          {isMobile? (
            <div>
              <HeaderCheckout/>
              <Details />
              <Summary />
              </div>
          ) : (
            <div className='grid grid-cols-[1.2fr_0.8fr] gap-5 lg:grid-cols-2 lg:gap-[244px] '>
              <Details/>
              <div>
                <HeaderCheckout/>
                <Summary/>
              </div>
            </div>
            
          )}

        
      </form>
    </div>
  );
};
