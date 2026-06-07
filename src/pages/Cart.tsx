import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums';
import { Button } from '@/components/ui';
import { CardCart } from '@/features/cart/CardCart';
import { useSmartCart } from '@/lib/hooks/useSmartCart';

export const Cart = () => {
  const { cartItemsWithData } = useSmartCart();

  const total = cartItemsWithData.reduce(
    (sum, { product, quantity }) =>
      sum + (product.price.discountedPrice ?? product.price.normalPrice) * quantity,
    0
  );

  return (
    <section className="w-full max-h-screen mt-[100px] py-[100px]">
      <div className="container h-full flex items-center justify-center">
        <div
          className={cn(
            'flex flex-col items-center p-7',
            cartItemsWithData.length > 0 ? 'max-w-[650px] gap-7' : 'max-w-[363px] gap-15',
          )}
        >
          <h6 className="w-full text-center text-second  font-[500] font-main">Кошик</h6>

            <h4 className='text-[100px]'>asdqwe</h4>
          <div className="w-full text-center pr-5 max-h-[440px] overflow-y-auto custom-scroll">
            {cartItemsWithData && cartItemsWithData.length > 0 ? (
              <div className="w-full flex flex-col gap-1">
                <div className="flex flex-col gap-7 ">
                  {cartItemsWithData.map(({ product, quantity }) => {

                    if (!product) return null;

                    return <CardCart key={product.id} item={product} quantity={quantity} itemId={product.id} />;
                  })}
                </div>
              </div>
            ) : (
              'У  вас немає товарів у кошику'
            )}
          </div>

          {cartItemsWithData && cartItemsWithData?.length > 0 && (
            <div className="w-full pt-7 border-t border-brown-dark flex items-center justify-between">
              <span className="text-second  font-[500] font-main text-brown-dark">Разом</span>{' '}
              <span className="font-third text-[24px] text-button">{total?.toFixed(2)} грн</span>

               
            </div>
          )}

          <div className="w-full">
            {cartItemsWithData && cartItemsWithData.length > 0 ? (
              <div className="flex items-center justify-between gap-5">
                <Button variant="outline" className="w-[287px]" asChild onClick={() => close()}>
                  <Link to={AppRoute.PRODUCTS}>Продовжити покупки</Link>
                </Button>

                 

                <Button className="w-[287px]" asChild onClick={() => close()}>
                  <Link to={AppRoute.CHECKOUT}>Оформити замовлення</Link>
                </Button>

              
              </div>

              
            ) : (
              <Button className="w-[307px]" asChild onClick={() => close()}>
                <Link to={AppRoute.PRODUCTS}>Переглянути каталог</Link>
              </Button>


            )}
          </div>
        </div>
      </div>
    </section>
  );
};
