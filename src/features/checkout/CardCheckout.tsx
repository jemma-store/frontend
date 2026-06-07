import { FC, useState } from 'react';
import cn from 'classnames';

import { DeleteIcon } from '@/assets';
import { Button } from '@/components/ui';
import { IProductItem } from '@/types/';
import { useModalStore } from '@/store';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { calculateItemTotalPrice } from '@/utils/calculateItemTotal';

interface ICardCheckout {
  item: IProductItem;
  quantity: number;
  availableQuantity?: number;
}

export const CardCheckout: FC<ICardCheckout> = ({ item, quantity }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useSmartCart();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleDeleteProduct = () => {
    useModalStore.getState().openDeleteFromCartModal(item.id);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(item.id);
    } else {
      decreaseQuantity(item.id);
    }
  };

  return (
    <>
      <article className="flex flex-col">

      <div className='hidden md:grid grid-cols-2 justify-between items-center mt-3 lg:mt-18'>
        <span className='text-[16px] font-normal'>Промокод</span>
        <button 
          type='button'
          className='text-[16px] border-1 p-3 w-max-full cursor-pointer hover:bg-button hover:text-white'
          >
            Додати
          </button>
      </div>

        <div className='grid grid-cols-[1fr_1.5fr] gap-2 md:gap-0 pt-4 md:flex md:flex-col md:pt-10 lg:pt-12 lg:grid '>
          <div className="w-full h-auto">
            {item.images.slice(0, 1).map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={item.name}
                className="w-full h-auto object-cover"
              />
            ))}
          </div>

          <div className="flex lg:flex-col justify-between md:pt-5 lg:pt-0 lg:pl-5">

            <div className='flex justify-between w-full'>
               <span className="text-[16px]">{item.name} "{item?.collectionName}"</span>
              <Button
                variant="ghost"
                className="p-0 pt-0 items-start"
                onClick={handleDeleteProduct}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <DeleteIcon
                  classname={cn(
                    'w-5 h-5 transition-all duration-300',
                    isHovering ? 'text-brown-dark' : 'text-grey',
                  )}
                  />
              </Button>
            </div>
           
            <div className='lg:flex lg:justify-end justify-between pt-8 lg:pt-0 items-center hidden lg:gap-5'>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className=" flex !w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark disabled:text-grey disabled:cursor-default transition-all duration-300"
                  disabled={quantity === 1}
                  onClick={handleDecrease}
                >
                  -
                </Button>

                <span className="w-[30px] h-[30px] lg:w-[25px] lg:h-[25px] border border-grey flex items-center justify-center">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  className="!w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark transition-all duration-300"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
              </div>
              <div className='text-[20px] text-[#5B242A] lg:text-[16px]'>
                {calculateItemTotalPrice(quantity, item.price.discountedPrice ?? item.price.normalPrice).toFixed(2)} грн
              </div>
            </div>
          </div>
      </div>

     <div className='flex justify-between pt-8 items-center lg:hidden'>
        <div className="flex items-center">
          <Button
            variant="ghost"
            className=" flex !w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark disabled:text-grey disabled:cursor-default transition-all duration-300"
            disabled={quantity === 1}
            onClick={handleDecrease}
          >
             -
          </Button>

          <span className="w-[30px] h-[30px] border border-grey flex items-center justify-center">
            {quantity}
          </span>

          <Button
            variant="ghost"
            className="!w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark transition-all duration-300"
            onClick={() => increaseQuantity(item.id)}
            >
              +
          </Button>
        </div>

          <div className='text-[20px] text-[#5B242A]'>
            {calculateItemTotalPrice(quantity, item.price.discountedPrice ?? item.price.normalPrice).toFixed(2)} грн
          </div>

     </div>
    </article>
    </>
  );
};








        