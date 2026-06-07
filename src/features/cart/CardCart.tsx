import { FC, useState } from 'react';
import cn from 'classnames';

import { DeleteIcon } from '@/assets';
import { Button } from '@/components/ui';
import { IProductItem } from '@/types/';
import { useModalStore } from '@/store';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { calculateItemTotalPrice } from '@/utils/calculateItemTotal';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

interface ICardCart {
  item: IProductItem;
  quantity: number;
  itemId: number;
  availableQuantity?: number;
}

export const CardCart: FC<ICardCart> = ({ item, quantity }) => {
  const {isTablet, isDesktop} = useWindowWidth();
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
    {isTablet || isDesktop? (
      <article>
        <div className='flex gap-5'>
          {item.images.slice(0,1).map((image, index) => (
           <img 
           key={index}
           src={image.url} 
           alt={item.name}
           className='object-cover w-[202px] h-[202px]' />
          ))}
           
          <div className='text-[16px] font-medium w-full pr-3'>
            <div className='text-start flex justify-between'>
              {item.categoryName} "{item.collectionName}"
              <div>
                <Button
              variant="ghost"
              className="!p-0 mt-[-15px]"
              onClick={handleDeleteProduct}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <DeleteIcon
                classname={cn(
                  'w-4 h-4 transition-all duration-300',
                  isHovering ? 'text-brown-dark' : 'text-grey',
                )}
              />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-5 pt-30">
              <div className="ml-[-10px] flex items-center gap-1">
              <Button
                variant="ghost"
                className="w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark disabled:text-grey disabled:cursor-default transition-all duration-300"
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
              <div className="min-w-[120px] text-second font-[500] font-main text-button">
                {calculateItemTotalPrice(quantity, item.price.discountedPrice ?? item.price.normalPrice).toFixed(2)} грн
              </div>
            </div>
          </div>
        </div>
      </article>
    ) : (
      <article>
      <div className='flex gap-5 mt-5 w-full h-full'>
        {item.images.slice(0,1).map((image, index) => (
          <img 
          key={index}
          src={image.url} 
          alt={item.name}
          className='object-cover w-[100px] h-[90px]' />
        ))}

        <div className='w-full flex justify-between font-medium pr-2'>
          <div>
            {item.categoryName} "{item.collectionName}"
          </div>
          <div>
              <Button
            variant="ghost"
            className="!p-0 mt-[-15px]"
            onClick={handleDeleteProduct}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <DeleteIcon
              classname={cn(
                'w-4 h-4 transition-all duration-300',
                isHovering ? 'text-brown-dark' : 'text-grey',
              )}
            />
              </Button>
          </div>
        </div>
      </div>
        <div className="flex items-center justify-between gap-5 pt-6">
          <div className="ml-[-10px] flex items-center gap-1">
            <Button
              variant="ghost"
              className="w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark disabled:text-grey disabled:cursor-default transition-all duration-300"
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

          <div className="min-w-[120px] text-second font-[500] font-main text-button pr-2">
            {calculateItemTotalPrice(quantity, item.price.discountedPrice ?? item.price.normalPrice).toFixed(2)} грн
          </div>
        </div>
        
    </article>
    )  }  
    </>
  );
};
